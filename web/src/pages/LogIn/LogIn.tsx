import React from "react";

interface Props {}

const LogIn: React.FC<Props> = () => {
  return (
    <div>
      <div>카카오톡 로그인</div>
      <p>또는</p>
      <form>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="이메일 주소를 입력하세요"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LogIn;
