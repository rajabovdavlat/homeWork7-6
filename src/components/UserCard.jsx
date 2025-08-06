import { useSelector } from "react-redux";

export default function UserCard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) return null;

  const avatarUrl = `https://i.pravatar.cc/150?u=${user.uid}`;

  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow rounded-2xl max-w-md ">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{user.displayName || "Без имени"}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>
    </div>
  );
}
