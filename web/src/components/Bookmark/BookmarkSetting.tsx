/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

interface BookmarkSettingProps {
    addFolder: (folderName: string) => void; // 새 리스트를 추가하는 함수의 타입 정의
}

const BookmarkSetting: React.FC<BookmarkSettingProps> = ({ addFolder }) => {
    const [listName, setListName] = useState<string>('');
    const [lists, setLists] = useState<string[]>(() => {
        const savedLists = localStorage.getItem('bookmarkLists');
        return savedLists ? (JSON.parse(savedLists) as string[]) : [];
    });

    // 리스트가 변경될 때마다 변경된 리스트를 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('bookmarkLists', JSON.stringify(lists));
    }, [lists]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListName(event.target.value);
    };

    const addList = () => {
        if (listName.trim() !== '') {
            const newList = listName.trim();
            setLists((prevLists) => [...prevLists, newList]);
            addFolder(newList); // 새 폴더 추가
            setListName(''); // 입력 필드 비우기
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addList();
        }
    };

    return (
        <div css={popupContainer}>
            <div css={{ flex: 5 }}>
                <p css={listTitle}>리스트</p>
                <input
                    css={inputArea}
                    placeholder="리스트 이름 입력"
                    value={listName}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
                />
                <div css={listContent}>
                    <ul css={ulStyle}>
                        {/* <li css={liStyle}>맘에들어 등산</li>
                        <li css={liStyle}>친구랑 같이 할거</li> */}
                        {lists.map((list, index) => (
                            <li key={index} css={liStyle}>
                                {list}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div css={addListBtnArea}>
                <button onClick={addList} css={addListBtn}>
                    새 리스트 만들기
                </button>
            </div>
        </div>
    );
};

const popupContainer = css`
    width: 350px;
    height: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 25px;
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;

    z-index: 9999;
`;

const listTitle = css`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const inputArea = css`
    width: 80%;
    margin-bottom: 10px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
`;

const listContent = css`
    max-height: 180px;
    overflow-y: auto;
`;

const ulStyle = css`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const liStyle = css`
    margin: 10px 10px 10px 0;
    font-size: 18px;
`;

const addListBtnArea = css`
    text-align: right;
`;

const addListBtn = css`
    border: none;
    background-color: white;
    cursor: pointer;
    font-weight: bold;
`;

export default BookmarkSetting;
