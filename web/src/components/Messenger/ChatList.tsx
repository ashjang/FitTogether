import React from "react";
import ChatListItem from "./ChatListItem";
import styled from "@emotion/styled";
import default_user_image from "./default_user_image.png";

const imageSrc: string = default_user_image;

interface Props {}

interface ChatMessage {
  senderProfileImage: string;
  senderNickname: string;
  lastMessageDate: string;
  lastMessageContent: string;
  newMessageCount: number;
}

interface ChatData {
  [key: string]: ChatMessage;
}

const data: ChatData = {
  message1: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "보낸사람닉네임",
    lastMessageDate: "마지막메시지날짜",
    lastMessageContent: "마지막메시지내용",
    newMessageCount: 99,
  },
  message2: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "운동중독자",
    lastMessageDate: "오전 8:55",
    lastMessageContent: "안녕하세요💪💪💪",
    newMessageCount: 1,
  },
  message3: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "홍길동",
    lastMessageDate: "어제",
    lastMessageContent: "ㅅㄱ하세요",
    newMessageCount: 0,
  },
  message4: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "김길동",
    lastMessageDate: "어제",
    lastMessageContent: "ㅅㄱ하세요",
    newMessageCount: 0,
  },
  message5: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "이길동",
    lastMessageDate: "어제",
    lastMessageContent: "ㅅㄱ하세요",
    newMessageCount: 0,
  },
  message6: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "박길동",
    lastMessageDate: "어제",
    lastMessageContent: "ㅅㄱ하세요",
    newMessageCount: 0,
  },
  message7: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "최길동",
    lastMessageDate: "어제",
    lastMessageContent: "ㅅㄱ하세요",
    newMessageCount: 0,
  },
  message8: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "정길동",
    lastMessageDate: "어제",
    lastMessageContent: "ㅅㄱ하세요",
    newMessageCount: 0,
  },
  message9: {
    senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
    senderNickname: "강길동",
    lastMessageDate: "어제",
    lastMessageContent: "ㅅㄱ하세요",
    newMessageCount: 0,
  },
};

const ChatList: React.FC<Props> = () => {
  return (
    <div>
      <ShowMateList>운동 메이트 리스트</ShowMateList>
      <ChatListItems>
        {Object.entries(data).map(([key, message]) => (
          <ChatListItem key={key} {...message} />
        ))}
      </ChatListItems>
    </div>
  );
};

const ShowMateList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 80px;
  font-size: 18px;
  font-weight: bold;
  background-color: #cccccc;
`;

const ChatListItems = styled.div`
  width: 290px;
  height: 420px;
  overflow-y: auto;
`;

export default ChatList;

// 나중에 참고!
//
// const [senderProfileImage, setSenderProfileImage] = useState<string>("");
// const [senderNickname, setSenderNickname] = useState<string>("");
// const [lastMessageDate, setLastMessageDate] = useState<string>("");
// const [lastMessageContent, setLastMessageContent] = useState<string>("");
// const [newMessageCount, setNewMessageCount] = useState<number>(1);
//
// // 컴포넌트가 마운트될 때
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("");
//       const {
//         senderProfileImage,
//         senderNickname,
//         lastMessageDate,
//         lastMessageContent,
//         newMessageCount,
//       } = response.data;
//
//       setSenderProfileImage(senderProfileImage);
//       setSenderNickname(senderNickname);
//       setLastMessageDate(lastMessageDate);
//       setLastMessageSummary(lastMessageContent);
//       setNewMessageCount(newMessageCount);
//     } catch (error) {
//       console.error("데이터 불러오기 실패:", error);
//     }
//   };
//   fetchData();
// }, []);
//
// //소켓이 업데이트될 때
// useEffect(() => {
//   // 웹 소켓으로 새로운 메시지를 받아옴
//   socket.on("newMessage", (newMessage) => {
//     // 새로운 메시지가 도착하면 상태를 업데이트
//     setSenderProfileImage(newMessage.senderProfileImage);
//     setSenderNickname(newMessage.senderNickname);
//     setLastMessageDate(newMessage.lastMessageDate);
//     setLastMessageContent(newMessage.lastMessageContent);
//     setNewMessageCount(newMessage.newMessageCount);
//   });

//   // 컴포넌트가 마운트될 때 서버로부터 초기 데이터를 받아옴
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("");
//       const {
//         senderProfileImage,
//         senderNickname,
//         lastMessageDate,
//         lastMessageContent,
//         newMessageCount,
//       } = response.data;

//       setSenderProfileImage(senderProfileImage);
//       setSenderNickname(senderNickname);
//       setLastMessageDate(lastMessageDate);
//       setLastMessageContent(lastMessageContent);
//       setNewMessageCount(newMessageCount);
//     } catch (error) {
//       console.error("데이터 불러오기 실패:", error);
//     }
//   };
//   fetchData();
// }, []);
