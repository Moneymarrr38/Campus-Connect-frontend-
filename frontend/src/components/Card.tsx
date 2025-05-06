import React from 'react';

type Props = {
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
};

const Card = ({ title, content, actions }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
      <div>{content}</div>
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
};

export default Card;
