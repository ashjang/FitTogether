import React from 'react';

interface BookmarkFolderProps {
  folders: string[];
}

const BookmarkFolder: React.FC<BookmarkFolderProps> = ({ folders }) => {
  return (
    <div>
      <ul>
        {folders.map((folder, index) => (
          <li key={index}>{folder}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkFolder;
