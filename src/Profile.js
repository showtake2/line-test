import React from 'react';

function Profile({ user }) {
  return (
    <div>
      <h2>プロフィール</h2>
      <p>LINEユーザー名: {user.displayName}</p>
      <p>LINEユーザーID: {user.id}</p>
      {/* 他のユーザー情報を表示することができます */}
    </div>
  );
}

export default Profile;
