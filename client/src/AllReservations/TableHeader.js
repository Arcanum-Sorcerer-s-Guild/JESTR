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
        <tr>
            {headers.map((header, i) => (
                <th
                    key={i}
                    className="px-24 py-2 text-center text-xs font-medium uppercase tracking-wider"
                >
                    {header.name}
                </th>
            ))}
        </tr>
    );
}

export default TableHeader;
