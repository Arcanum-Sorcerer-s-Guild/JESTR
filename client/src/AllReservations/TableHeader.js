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
        <tr  className=" mix-blend-hard-light text-primary grid-container grid grid-cols-12 border-b border-black items-center">
            {headers.map((header, i) => (
                <th
                    key={i}
                    className="px-24 py-2 text-center text-xs font-medium uppercase tracking-wider col-span-2"
                >
                    {header.name}
                </th>
            ))}
        </tr>
    );
}

export default TableHeader;
