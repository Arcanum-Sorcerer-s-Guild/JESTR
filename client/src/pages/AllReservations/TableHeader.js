const TableHeader = () => {
  const headers = [
    { name: 'Site Location' },
    { name: 'Threat (Equipment)' },
    { name: 'Squadron' },
    { name: 'Start Date' },
    { name: 'End Date' },
    { name: 'Status' },
  ];
  return (
    <tr className="bg-gray-dark text-gray-light uppercase text-sm leading-normal">
      {headers.map((header, i) => (
        <th key={i} className="sticky top-0 py-3 px-6 text-left">
          {header.name}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
