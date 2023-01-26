import React from 'react';

const ChildList: React.FC<TChildList> = ({
  params1,
  params2,
  params3,
  params4,
}) => {
  return (
    <tr>
      {params1 && <td className="px-6 py-3">{params1}</td>}
      {params2 && <td className="px-6 py-3">{params2}</td>}
      {params3 && <td className="px-6 py-3">{params3}</td>}
      {params4 && <td className="px-6 py-3">{params4}</td>}
    </tr>
  );
};

type TChildList = {
  params1?: string;
  params2?: string;
  params3?: string;
  params4?: string;
};

export default ChildList;
