import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import UserProfile from './UserProfile';

export interface User {
    id: number;
    category: string;
    lat: number;
    lng: number;
}
interface MapProps {
    category: string;
}

const Map = (props: MapProps) => {
    //tab click
    const [category, setCategory] = useState<string>(props.category || '러닝');
    // map
    const kakaoMapRef = useRef<HTMLDivElement>(null);
    //user marker
    const [users, setUsers] = useState<User[]>([]);
    // user click
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleTabClick = (newCategory: string) => {
        setCategory(newCategory);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then((response) => response.json())
            .then((data: User[]) => setUsers(data))
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    // 마이페이지 내가 설정된 위치라고 가정했을때 (만약 홍대)
    const userLocation = {
        lat: 37.556862,
        lng: 126.924678,
    };

    useEffect(() => {
        if (!kakaoMapRef.current) {
            return;
        }
        // 내 저장된 위치 기준으로 지도 생성
        const targetPoint = new kakao.maps.LatLng(userLocation.lat, userLocation.lng);
        const options = {
            center: targetPoint,
            level: 3,
        };
        const map = new window.kakao.maps.Map(kakaoMapRef.current, options);

        users
            .filter((user) => user.category === category)
            .forEach((user) => {
                const markerPosition = new kakao.maps.LatLng(user.lat, user.lng);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);

                kakao.maps.event.addListener(marker, 'click', function () {
                    setSelectedUser(user);
                });
            });
    }, [users, category]);

    const handleClose = () => {
        setSelectedUser(null);
    };

    return (
        <MapContainer isSidebarOpen={selectedUser !== null}>
            <BtnTab>
                <button
                    className={`category01 ${category === '러닝' ? 'active' : ''}`}
                    onClick={() => handleTabClick('러닝')}
                >
                    러닝
                </button>
                <button
                    className={`category02 ${category === '등산' ? 'active' : ''}`}
                    onClick={() => handleTabClick('등산')}
                >
                    등산
                </button>
                <button
                    className={`category03 ${category === '헬스' ? 'active' : ''}`}
                    onClick={() => handleTabClick('헬스')}
                >
                    헬스
                </button>
            </BtnTab>
            <MapBox ref={kakaoMapRef} isSidebarOpen={selectedUser !== null}></MapBox>
            {selectedUser && (
                <UserProfileWrapper>
                    <UserProfile user={selectedUser} onClose={handleClose} />
                </UserProfileWrapper>
            )}
        </MapContainer>
    );
};

const MapContainer = styled.div<{ isSidebarOpen: boolean }>`
    position: relative;
    max-width: 1440px;
    height: 100%;
    margin: 0px auto;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
    transition: all 0.3s;
`;

const BtnTab = styled.div`
    position: relative;
    top: 30px;
    z-index: 10;
    button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #000;
        border-radius: 20px;
        padding: 4px 20px;
        background-color: #fff;

        &.active {
            background-color: #000;
            color: #fff;
        }
    }
    .category01 {
        left: 40%;
        transform: translateX(-40%);
    }
    .category03 {
        left: 60%;
        transform: translateX(-60%);
    }
`;
const MapBox = styled.div<{ isSidebarOpen: boolean }>`
    position: absolute;
    top: 130px;
    // left: 50%;
    // transform: translateX(-50%);

    // width: ${(props) => (props.isSidebarOpen ? '50%' : '70%')};
    width: 70%;
    height: 70%;

    border-radius: 10px;
    transition: all 0.3s;

    left: ${(props) => (props.isSidebarOpen ? '40%' : '50%')};
    transform: translateX(${(props) => (props.isSidebarOpen ? '-50%' : '-50%')});
`;

//프로필
const UserProfileWrapper = styled.div`
    position: absolute;
    right: -120px;
    top: 200px;
    width: 30%;
    height: 100%;
`;

export default Map;
