interface IDetailsProps {
  firstName: string;
  lastName: string;
  username: string;
}

export const Details = ({ firstName, lastName, username }: IDetailsProps) => {
  return (
    <div className="flex flex-col mb-4 mr-16">
      <h1 className="font-sans text-2xl font-medium text-gray-800">
        {firstName} {lastName}
      </h1>
      <p className="text-gray-600">{username}</p>
    </div>
  );
};
