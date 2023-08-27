// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import React, { useState } from 'react';

// import ChatList from './ChatList';
// import ChatWindow from './ChatWindow';

// function ParentComponent() {
//     const [selectedChatRoomId, setSelectedChatRoomId] = useState<string>(''); // 또는 초기값을 제공하지 않아도 됩니다.

//     const handleChatRoomClick = (chatRoomId) => {
//         setSelectedChatRoomId(chatRoomId);
//     };

//     return (
//         <Router>
//             <ChatList onChatRoomClick={handleChatRoomClick} />
//             <Switch>
//                 <Route path="/chat/:chatRoomId">
//                     <ChatWindow chatRoomId={selectedChatRoomId} />
//                 </Route>
//             </Switch>
//         </Router>
//     );
// }

// export default ParentComponent;
