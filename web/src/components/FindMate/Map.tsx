import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import UserMarkerSrc from '../../assets/user_marker.png';
import MyMarkerSrc from '../../assets/my_marker.png';
import UserProfile from './UserProfile';
import Modal from 'react-modal';

// 유저 정보 데이터 타입
interface User {
    userId: number;
    nickname: string;
    gender: boolean;
    introduction: string;
    exerciseChoice: string[];
    latitude: number;
    longitude: number;
}

const Map: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const [category, setCategory] = useState<string>('RUNNING');
    const kakaoMapRef = useRef<HTMLDivElement | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [map, setMap] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMarker, setCurrentMarker] = useState<any>(null);
    const [locationKeyword, setLocationKeyword] = useState<string | null>(null);

    // 기본 위도 경도: '서울특별시청'
    const dafaultLatitude = 37.566826;
    const dafaultLongitude = 126.9786567;

    // 카테고리 탭 클릭 시 해당 상태를 저장하는 함수
    const handleCategoryClick = (newCategory: string) => {
        setCategory(newCategory);
        setSelectedUser(null);
    };

    // 지도에서 클릭 이벤트 발생 시 해당 위치의 위도 경도를 상태에 저장하는 함수
    const handleMapClick = (mouseEvent: any) => {
        const clickedLatLng = mouseEvent.latLng;
        setLatitude(clickedLatLng.getLat());
        setLongitude(clickedLatLng.getLng());
    };

    // 내 위치 업데이트 함수 (API: 현재 나의 위치 업데이트)
    const putCurrentLocation = async () => {
        try {
            const response = await axios.put(
                `/api/location?lat=${latitude}&long=${longitude}`,
                {},
                {
                    headers: { 'X-AUTH-TOKEN': token },
                }
            );
            console.log(response.data);

            // 실행 성공 후 곧바로 주변 사용자 조회
            getUsers();
        } catch (error) {
            console.error(error);
        }
    };

    // 해당 위치 주변의 사용자를 조회하는 함수 (API: 3km 내 사용자 조회)
    const getUsers = async () => {
        try {
            const response = await axios.get('/api/location/map', {
                headers: { 'X-AUTH-TOKEN': token },
            });
            console.log(response.data);

            // 주변 사용자를 상태에 저장
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 현재 위치 marker 생성하는 함수
    const createLocationMarker = () => {
        if (map) {
            // 마커 초기화
            if (currentMarker) {
                currentMarker.setMap(null);
            }

            //
            const newLatLng = new window.kakao.maps.LatLng(latitude, longitude);
            // 지도를 새로운 위치로 이동
            map.panTo(newLatLng);

            // 새로운 좌표의 위치를 기반으로 마커를 생성
            const marker = new window.kakao.maps.Marker({
                position: newLatLng,
                image: new window.kakao.maps.MarkerImage(
                    MyMarkerSrc,
                    new window.kakao.maps.Size(50, 50)
                ),
            });

            // 마커 객체를 map에 찍는 메서드
            marker.setMap(map);

            // 다음 마커 등록 시 기존 마커를 삭제하기 위해 상태로 관리
            setCurrentMarker(marker);
        }
        // 이후 바로 위치 등록
        putCurrentLocation();
    };

    // 마운트 시 & 카테고리 변경 시 실행되는 함수
    useEffect(() => {
        // 현재 위치의 위도, 경도 상태에 저장
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }

        // 카카오맵 오류시 함수 종료
        if (!kakaoMapRef.current) {
            return;
        }

        // 카카오맵 초기 위치 설정하여 map 상태에 저장
        const options = {
            center: new window.kakao.maps.LatLng(dafaultLatitude, dafaultLongitude),
            level: 3,
        };
        const map = new window.kakao.maps.Map(kakaoMapRef.current, options);
        setMap(map);
        window.kakao.maps.event.addListener(map, 'click', handleMapClick);
    }, [category]);

    // users 상태가 업데이트될 때 실행되는 함수
    useEffect(() => {
        users?.forEach((user) => {
            // 좋아하는 운동에 현재 카테고리의 운동이 있는 user만 추출
            if (user.exerciseChoice.includes(category)) {
                // 위치 설정 후 marker를 찍어서 지도에 출력
                const userLatLng = new window.kakao.maps.LatLng(user.latitude, user.longitude);
                console.log(user.latitude, user.longitude);
                const marker = new window.kakao.maps.Marker({
                    position: userLatLng,
                    image: new window.kakao.maps.MarkerImage(
                        UserMarkerSrc,
                        new window.kakao.maps.Size(65, 65)
                    ),
                });

                marker.setMap(map);

                // 각 마커에 이벤트 리스너 등록
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    // 해당 유저를 상태로 저장
                    setSelectedUser(user);
                    // 팝업을 열기위한 상태 업데이트
                    setIsModalOpen(true);
                });
            }
        });
    }, [users]);

    // 키워드를 상태에 저장하는 함수
    const handleLocationKeyword = (keyword: string) => {
        setLocationKeyword(keyword);
    };

    // 키워드 검색 완료 시 호출되는 콜백함수
    const placesSearchCB = (data: any, status: any) => {
        console.log(status);
        if (status === window.kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
            const bounds = new window.kakao.maps.LatLngBounds();

            // 검색된 각 장소의 좌표를 이용하여 지도 범위 재설정
            for (var i = 0; i < data.length; i++) {
                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 해당 범위로 지도 위치 설정
            map.setBounds(bounds);
        }
    };

    // 검색 버튼 눌렀을 때 실행할 함수
    const handleClickSearchBtn = () => {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(locationKeyword, placesSearchCB);
    };

    // Enter 키 누를 때도 handleClickSearchBtn 실행하도록 처리
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClickSearchBtn();
        }
    };

    // 모달 토글 함수
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <MapContainer>
            <CategoryBtnTab>
                <CategoryBtn
                    className={category === 'RUNNING' ? 'active' : ''}
                    onClick={() => handleCategoryClick('RUNNING')}
                >
                    러닝
                </CategoryBtn>
                <CategoryBtn
                    className={category === 'HIKING' ? 'active' : ''}
                    onClick={() => handleCategoryClick('HIKING')}
                >
                    등산
                </CategoryBtn>
                <CategoryBtn
                    className={category === 'WEIGHT' ? 'active' : ''}
                    onClick={() => handleCategoryClick('WEIGHT')}
                >
                    헬스
                </CategoryBtn>
            </CategoryBtnTab>
            <LocationSearchBar>
                <LocationSearchInput
                    type="text"
                    placeholder="검색어로 장소 찾기"
                    onChange={(event) => {
                        handleLocationKeyword(event.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                />
                <LocationSearchBtn onClick={handleClickSearchBtn}>입력</LocationSearchBtn>
            </LocationSearchBar>

            <MapBox ref={kakaoMapRef}>
                <CreateMarkerButton onClick={createLocationMarker}>
                    <span className="blind">위치 설정 버튼</span>
                    <CrosshairsIcon icon={faCrosshairs} />
                </CreateMarkerButton>
            </MapBox>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleToggleModal}
                contentLabel="Example Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 99,
                    },
                    content: {
                        width: 'max-content',
                        height: 'max-content',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 'none',
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <UserProfile selectedUser={selectedUser} />
            </Modal>
        </MapContainer>
    );
};

const MapContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    margin: 0px auto;
    transition: all 0.3s;
`;

const CategoryBtnTab = styled.div`
    margin-top: 50px;
`;

const CategoryBtn = styled.button`
    border-style: none;
    border-radius: 10px;
    padding: 3px 10px;
    margin: 0px 5px;
    cursor: pointer;
    background-color: #dddddd;
    box-shadow: 2.5px 5px 10px rgba(0, 0, 0, 0.5);
    font-size: 18px;
    &.active {
        background-color: #ffc0cb;
    }
    &:hover {
        background-color: #ffd0dd;
    }
    font-size: 18px;
`;

const LocationSearchBar = styled.div`
    position: absolute;
    z-index: 5;
    top: 120px;
    left: 10px;
    opacity: 0.8;

    overflow: hidden;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
`;

const LocationSearchInput = styled.input`
    width: max-contents;
    min-width: 400px;
    font-size: 20px;
    padding: 0px 10px;
    border-style: none;
    border: 1px solid #ccc;
    border-radius: 10px 0 0 0;
    outline: none;
`;

const LocationSearchBtn = styled.button`
    font-size: 20px;
    padding: 0px 5px;
`;

const MapBox = styled.div`
    position: relative;
    width: 1000px;
    height: 700px;
    margin-top: 25px;
    border-radius: 20px;
    z-index: 0px;
    border: 3px solid #ddd;
`;

const CreateMarkerButton = styled.button`
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 10px 10px 5px 10px;
    border: none;
    border-radius: 50%;
    background-color: rgba(150, 150, 150, 0.3);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
    border-bottom: 3px solid #666;
    z-index: 10;
`;
const CrosshairsIcon = styled(FontAwesomeIcon)`
    font-size: 30px;
`;

export default Map;
