import { useContext } from "react";
import { tableContext } from "./Table";

const TableBody = ({columns}) => {
    const {tableData} = useContext(tableContext);
    
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : '__';
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
