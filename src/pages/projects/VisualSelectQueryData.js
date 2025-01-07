import React, { useEffect, useState, useRef } from "react";

import 'assets/styles/pages/projects/VisualSelectQueryData.css'

import projectData from 'components/data/ProjectData';

///-- Sample Database START -------------------------------------------------------------
const database ={
  table : [
      {
          name : 'employee',
          columns : [
              { field :'employee_id', type : 'varchar(4)', null : 'NOT NULL', key  : 'PRIMARY KEY', default : 'NULL'}
              , { field :'name', type : 'varchar(20)', null : 'NOT NULL', key : '', default : 'NULL'}
              , { field :'email', type : 'varchar(20)', null : 'NULL', key : '', default : 'NULL'}
              , { field :'salary', type : 'int(5)', null : 'NULL', key : '', default : 'NULL'}
              , { field :'job_id', type : 'varchar(4)', null : 'NULL', key : '', default : 'NULL'}
              , { field :'department_id', type: 'varchar(4)', null : 'NULL', key : '', default : 'NULL'}
          ],
          rows : [
              { employee_id : 'E001', name :  'Grayson',    email : 'grayson@email.com',   salary : 4350,    job_id : 'J001', department_id :  'D001'},
              { employee_id : 'E002', name :  'Sebastien',  email : 'sebastien@email.com', salary : 'NULL',  job_id : 'J001', department_id :  'D001'},
              { employee_id : 'E003', name :  'Wojciech',   email : 'wojciech@email.com',  salary : 9125,    job_id : 'J002', department_id :  'D001'},
              { employee_id : 'E004', name :  'Nana',       email : 'nana@email.com',      salary : 7710,    job_id : 'J001', department_id :  'D001'},
              { employee_id : 'E005', name :  'Viola',      email : 'viola@email.com',     salary : 8900,    job_id : 'NULL', department_id :  'D002'},
              { employee_id : 'E006', name :  'Roberta',    email : 'roberta@email.com',   salary : 4100,    job_id : 'J004', department_id :  'D003'},
              { employee_id : 'E007', name :  'Alice',      email : 'alice@email.com',     salary : 12100,   job_id : 'J005', department_id :  'D003'},
              { employee_id : 'E008', name :  'Saad',       email : 'saad@email.com',      salary : 5200,    job_id : 'J004', department_id :  'D003'},
              { employee_id : 'E009', name :  'Greta',      email : 'greta@email.com',     salary : 7000,    job_id : 'J004', department_id :  'NULL'},
              { employee_id : 'E010', name :  'Adam',       email : 'adam@email.com',      salary : 9500,    job_id : 'J004', department_id :  'D003'},
              { employee_id : 'E011', name :  'Jade',       email : 'jade@email.com',      salary : 9200,    job_id : 'J007', department_id :  'D004'},
              { employee_id : 'E012', name :  'Md',         email : 'md@email.com',        salary : 5500,    job_id : 'J006', department_id :  'D004'},
              { employee_id : 'E013', name :  'Axel',       email : 'axel@email.com',      salary : 6300,    job_id : 'J006', department_id :  'D004'},
              { employee_id : 'E014', name :  'Mikayla',    email : 'mikayla@email.com',   salary : 7200,    job_id : 'J006', department_id :  'D004'},
              { employee_id : 'E015', name :  'Ehsan',      email : 'NULL',                salary : 8600,    job_id : 'J008', department_id :  'D005'}
          ]
      }
      ,{
          name : 'department',
          columns : [
              { field :'department_id', type : 'varchar(4)', null : 'NOT NULL', key  : 'PRIMARY KEY', default : 'NULL'}
              , { field :'department_name', type : 'varchar(20)', null : 'NOT NULL', key : '', default : 'NULL'}
          ],
          rows : [
              { department_id : 'D001', department_name : 'Marketing'},
              { department_id : 'D002', department_name : 'Human Resources'},
              { department_id : 'D003', department_name : 'IT'},
              { department_id : 'D004', department_name : 'Finance'},
              { department_id : 'D005', department_name : 'Sales'},
              { department_id : 'D006', department_name : 'Design'},
          ]
      }
      ,{
          name : 'jobs',
          columns : [
              { field :'job_id', type : 'varchar(4)', null : 'NOT NULL', key  : 'PRIMARY KEY', default : 'NULL'}
              , { field :'job_title', type : 'varchar(20)', null : 'NOT NULL', key : '', default : 'NULL'}
              , { field :'min_salary', type : 'int(5)', null : 'NULL', key : '', default : 'NULL'}
              , { field :'max_salary', type : 'int(5)', null : 'NULL', key : '', default : 'NULL'}
          ],
          rows : [
              { job_id : 'J001', job_title : 'Marketer',          min_salary : 4300,   max_salary : 9300},
              { job_id : 'J002', job_title : 'Marketing Manager', min_salary : 8400,   max_salary : 12400},
              { job_id : 'J003', job_title : 'HR Manager',        min_salary : 6100,   max_salary : 9100},
              { job_id : 'J004', job_title : 'IT Programmer',     min_salary : 4000,   max_salary : 11000},
              { job_id : 'J005', job_title : 'IT Manager',        min_salary : 6700,   max_salary : 13000},
              { job_id : 'J006', job_title : 'Accountant',        min_salary : 5400,   max_salary : 8100},
              { job_id : 'J007', job_title : 'Finance Manager',   min_salary : 7900,   max_salary : 11200},
              { job_id : 'J008', job_title : 'Sales Manager',     min_salary : 6200,   max_salary : 9300},
              { job_id : 'J009', job_title : 'Design Manager',    min_salary : 'NULL', max_salary : 11000},
              { job_id : 'J010', job_title : 'Design Junior',     min_salary : 7300,   max_salary : 'NULL'}
          ]
      }
  ]
  /**
   * Table Relation
   */
  ,relation : []
  /**
   * Find Table in database
   * 
   * @param {*} tableName 
   */
  ,getTable : function(tableName){
      const table = this.table.find(item => item.name.toUpperCase() === tableName.toUpperCase());
      if ( !table ){
          throw new Error(`Not Found Table (${tableName})`);
      }
      return table;
  }

  /**
   * Return relation of Table
   * [ 
   *  {
   *      id
   *      , sourceTable : { tableName, attribute }
   *      , targetTable   : { tableName, attribute }
   *  }
   * ]
   */
  ,getRelation : function(){
      if ( this.relation.length <= 0 ){
          database.table.forEach((item,index) => {
              const keyColumns = item.columns.filter(filterItem => filterItem.key !== '' ).flatMap(flatMapItem => flatMapItem.field);
              const otherTable    = database.table.filter( filterItem => filterItem.name !== item.name);
      
              otherTable.forEach((innerItem, innerIndex) =>{
                  const filter = innerItem.columns.filter(filterItem => filterItem.key === '' && keyColumns.includes(filterItem.field));
                  if ( filter && filter.length > 0 ){
                      var id = "id" + Math.random().toString(16).slice(2)
                      let tableRR = {
                          id : id
                          ,sourceTable : {
                              tableName : item.name
                              ,attribute : filter[0].field
                          }
                          ,targetTable : {
                              tableName : innerItem.name
                              ,attribute : filter[0].field
                          }
                      }
                      this.relation.push(tableRR);
                  }
              });
          });
      }
      return this.relation;
  }
}
///-- Sample Database END-------------------------------------------------------------


/**
 * Create TABLE html tag. Using parameter data.
 * 
 * @param {*} tableName 
 * @param {*} headerData 
 * @param {*} bodyData 
 * @param {*} customStyle 
 * @returns 
 */
const createTableHtml = (tableName, headerData, bodyData, customStyle = {}, highlightColumnKey = []) => {

  const getCellClassName = (tdValue, isHighlight, isNull) => {
    let classNames = [];
  
    // 기본 highlight 및 null 처리
    if (isHighlight) classNames.push("highlight-cell");
    if (isNull) classNames.push("null-cell");
  
    return classNames.join(" ").trim();
  };

  const getDisplayValue = (tdValue) => {
    if (typeof tdValue === "string" && /^(true|false|AND|OR|=|\s)+$/i.test(tdValue)) {
      // 논리 연산식 파싱
      const elements = tdValue.split(/\s+/).map((item) => {
        const lowerItem = item.toLowerCase();
  
        if (lowerItem === "true") {
          return <span className="boolean-cell-true" key={Math.random()}>true</span>;
        } else if (lowerItem === "false") {
          return <span className="boolean-cell-false" key={Math.random()}>false</span>;
        } else {
          return <span className="boolean-cell-logicalOperator" key={Math.random()}>{item}</span>;
        }
      });
  
      return elements.reduce((prev, curr) => [prev, " ", curr]); // 요소를 공백으로 연결
    }
  
    // Boolean 값 처리
    if (typeof tdValue === "boolean") {
      const spanClassName = tdValue ? "boolean-cell-true" : "boolean-cell-false";
      return <span className={spanClassName}>{tdValue.toString()}</span>;
    }
  
    // 기본적으로 tdValue를 반환
    return tdValue;
  };
  return (
    <table className="table-template" data-table-relation-info={tableName} key={tableName} style={customStyle}>
      {tableName && <caption className="table-title">{tableName}</caption>}
      <thead>
        <tr>
          {headerData.map((headerItem) => (
            <th key={`${tableName}-${headerItem.key}`}>{headerItem.value.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyData.map((row, rowIndex) => (
          <tr key={`${tableName}-row-${rowIndex}`}> 
            {headerData.map((headerItem) => {
              const tdValue = row.reduce((prev,curr) => (prev === curr.key) ? curr.value : prev, headerItem.key);
              const isHighlight = highlightColumnKey.includes(headerItem.key);
              const isNull  = tdValue === 'NULL';

              // 클래스 이름 계산
              const cellClassName = getCellClassName(tdValue, isHighlight, isNull);

              // className={isHighlight ? "highlight-cell" : ""}
              return (<td key={`${tableName}-row-${rowIndex}-${headerItem.key}`} data-column-key={headerItem.key} className={cellClassName}>
                {getDisplayValue(tdValue)}
              </td>);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Create Custom Selector that Container selecte table and column.
 * 
 * @returns 
 */
const CreateColumnSelectorContainer = () => {
  const [columns, setColumns] = React.useState([]);
  const [selectedColumn, setSelectedColumn] = React.useState("");
  
  const initializeState = React.useCallback(() => {
    if (database.table.length > 0) {
      const initTable = database.table[0];
      const initialColumns = initTable.columns.map(item => item.field,[]);;
      setColumns(initialColumns);
      if (initialColumns.length > 0) {
        setSelectedColumn(initialColumns[0]);
      }
    }
  }, []);

  const handleTableChange = (event) => {
    const selectedTable = database.getTable(event.target.value);
    const selectedColumns = selectedTable.columns.map(item => item.field,[]);
    setColumns(selectedColumns);
    setSelectedColumn(selectedColumns.length > 0 ? selectedColumns[0] : "");
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  let tableName = database.table.map(item => item.name);

  React.useEffect(() => {
    initializeState();
  }, [initializeState]);

  return (
    <div className="column-selector-container">
        <select className="selector select-table" title="select-table" onChange={handleTableChange}>
          {tableName.map((tableName) => (
            <option key={tableName} value={tableName}>{tableName.toUpperCase()}</option>
          ))}
        </select>
        <span className="dot">.</span>
        <select className="selector select-column" title="select-column" value={selectedColumn} onChange={handleColumnChange}>
          {columns.map((columnName) => (
            <option key={columnName} value={columnName}>{columnName.toUpperCase()}</option>
          ))}
        </select>
    </div>
  );
};

/**
 * Each Keyword Area create HTML tag.
 * 
 * @param {*} param0 
 * @returns 
 */
const KeywordWrapper = ({title, maxRow, isReset, setIsReset, fromTable, joinTables, setJoinTables}) => {
  const [state, setState] = useState({
    joinRows: [],
    whereRows: [],
    orderbyRows: [],
  });

  const [errorMessage, setErrorMessage] = useState("");

  React.useEffect(() => {
    if ( isReset ){
      setState({ joinRows: [], whereRows: [], orderbyRows: [] });
      setErrorMessage("");
      setIsReset(false);
    }
  }, [isReset, setIsReset]);

  // 행 추가 함수
  const addRow = () => {
    const typeKey = `${title.toLowerCase()}Rows`;
    const currentRows = state[typeKey];

    if (currentRows.length >= maxRow) {
      setErrorMessage(`You can only add a maximum of ${maxRow} rows.`);
      return;
    }

    if (title === "join") {
      const availableTables = getAvailableTables(joinTables.length);
      const firstAvailableTable = availableTables.length > 0 ? availableTables[0] : "";
      setJoinTables([...joinTables, firstAvailableTable]);
    }

    setState((prevState) => ({
      ...prevState,
      [typeKey]: [...currentRows, { id: Date.now() }],
    }));
    setErrorMessage("");
  };

  // 행 삭제 함수
  const removeRow = (id) => {
    const typeKey = `${title.toLowerCase()}Rows`;
    const currentRows = state[typeKey];

    if (title === "join") {
      const updatedJoins = [...joinTables];
      const rowIndex = currentRows.findIndex((row) => row.id === id);
      updatedJoins.splice(rowIndex, 1);
      setJoinTables(updatedJoins);
    }

    setState((prevState) => ({
      ...prevState,
      [typeKey]: currentRows.filter((row) => row.id !== id),
    }));
    setErrorMessage("");
  };

  // JOIN 테이블 선택 핸들러
  const handleJoinChange = (index, value) => {
    const updatedJoins = [...joinTables];
    updatedJoins[index] = value;
    setJoinTables(updatedJoins);
  };

  // 선택 가능한 테이블 필터링
  const getAvailableTables = (index) => {
    const selectedTables = [fromTable, ...joinTables.slice(0, index)];
    return database.table.map((item) => item.name.toUpperCase()).filter((tableName) => !selectedTables.includes(tableName));
  };

  const renderComponentByTitle = (title, row) => {
    switch(title){
      case "join":
        return (
          <div className="join-row" key={row.id}>
            <span className="icon-button" onClick={() => removeRow(row.id)}>-</span>
            <select className="select-join" title="select-join">
              <option>INNER JOIN</option>
              <option>LEFT OUTER JOIN</option>
              <option>RIGHT OUTER JOIN</option>
              <option>FULL OUTER JOIN</option>
            </select>
            <select
              className="select-table"
              title="select-table"
              onChange={(e) =>
                handleJoinChange(
                  state.joinRows.findIndex((r) => r.id === row.id),
                  e.target.value
                )
              }
            >
              {getAvailableTables(
                state.joinRows.findIndex((r) => r.id === row.id)
              ).map((tableName) => (
                <option key={tableName} value={tableName}>
                  {tableName}
                </option>
              ))}
            </select>
            ON
            <CreateColumnSelectorContainer />=<CreateColumnSelectorContainer />
          </div>
        );
      case "where":
        return (
          <div className="where-row" key={row.id}>
            <span className="icon-button" onClick={() => removeRow(row.id)}>-</span>
            {state.whereRows.findIndex((r) => r.id === row.id) > 0 && ( // 첫 번째 row에서는 select-logic-operator가 보이지 않음
              <select className="select-logic-operator" title="select-logic-operator">
                <option>AND</option>
                <option>OR</option>
              </select>
            )}
            <CreateColumnSelectorContainer />
            <select className="select-operator" title="select-operator">
              <option>IS NULL</option>
              <option>IS NOT NULL</option>
            </select>
          </div>
        );
      case "orderby":
        return (
          <div className="orderby-row" key={row.id}>
            <span className="icon-button" onClick={() => removeRow(row.id)}>-</span>
            <CreateColumnSelectorContainer />
            &nbsp;
            <select className="select-sort" title="select-sort">
              <option>DESC</option>
              <option>ASC</option>
            </select>
          </div>
        );
      default:
        return(<></>);
    }
  }

  const rowsToRender = state[`${title.toLowerCase()}Rows`];

  return(
    <div className={`${title.toLowerCase()}-area`}>
      <p>
        {title.toUpperCase()}
        <span className="icon-button" onClick={addRow}>+</span>
        {errorMessage && (
            <span style={{ color: "red", marginLeft: "10px" }}>{errorMessage}</span>
        )}
      </p>
      <div className={`${title.toLowerCase()}-row-area`}>
        {/* {title.toLowerCase() === "where" && <div className="where-row">1=1</div>} */}
        {/* {rows.map((_, index) => renderComponentByTitle(title, index, removeRow))} */}
        {rowsToRender.map((row) => renderComponentByTitle(title, row))}
      </div>
    </div>
  );
}

/**
 * Create Error Object.
 * 
 * @param {*} errorCode 
 * @param {*} errorMessage 
 * @returns 
 */
const createErrorObj = (errorCode, errorMessage) => {
  const errorObject = new Error(errorMessage);
  errorObject.code = errorCode;
  return errorObject;
}

const deepCopyData = (data) => {
  return JSON.parse(JSON.stringify(data));
}

const VisualSelectQueryData = () => {
  const project = projectData.find(v => v.id === 1);

  /** project info */
  const [isVersionVisible, setIsVersionVisible] = useState(false);

  /** table relation information */
  const [tableElements, setTableElements] = useState([]);
  const tableWrapperRef = useRef(null);
  const svgRef = useRef(null);

  /** select query */
  const [isReset, setIsReset] = useState(false);

  /** selected Table */
  const [fromTable, setFromTable] = useState(database.table[0].name.toUpperCase()); // FROM에서 선택된 테이블
  const [joinTables, setJoinTables] = useState([]); // JOIN에서 선택된 테이블 목록


  /** result area */
  const [result, setResult] = useState(null); // 결과 데이터 상태

  const resetAll = () => {
    // Reset 버튼 클릭 시 KeywordWrapper 상태 초기화
    setIsReset(true);
  };

  const runQuery = () => {
    const fromData = document.querySelector('.from-row select > option:checked').value;

    const joinData = [];
    const joinCheckedData = Array.from(document.querySelectorAll('.join-row'), (rowItem) => rowItem.querySelectorAll('option:checked'));
    joinCheckedData.forEach((item) => {
      const joinObject = {
        joinOperator     : item[0].value,
        joinTable        : item[1].value,
        conditionTable1  : item[2].value,
        conditionColumn1 : item[3].value,
        conditionTable2  : item[4].value,
        conditionColumn2 : item[5].value
      }
      joinData.push(joinObject);
    });

    const whereData = [];
    const whereRows = document.querySelectorAll(".where-row");
    Array.from(whereRows, (rowItem, index) => {
      const selectedOptions = rowItem.querySelectorAll("option:checked");
      whereData.push({
        whereLogicOperator: index > 0 ? selectedOptions[0]?.value : null, // 첫 번째 행은 Logic Operator 없음
        whereTable: selectedOptions[index > 0 ? 1 : 0]?.value,
        whereColumn: selectedOptions[index > 0 ? 2 : 1]?.value,
        whereCondition: selectedOptions[index > 0 ? 3 : 2]?.value,
      });
    });

    const orderbyData = [];
    const orderbyCheckedData = Array.from(document.querySelectorAll('.orderby-row'), (rowItem) => rowItem.querySelectorAll('option:checked'));
    orderbyCheckedData.forEach((item) => {
      const orderbyObject = {
        orderbyTable      : item[0].value,
        orderbyColumn     : item[1].value,
        orderbySort       : item[2].value
      };
      orderbyData.push(orderbyObject);

    });

    processQuery(fromData, joinData, whereData, orderbyData);
  };

  
  const processQuery = (fromData, joinData, whereData, orderbyData) => {

    let resultData = {
      step : [],
      error : null,
      final : null
    };

    let stepCount = 0;
    let resultQueryData;

    const setFinalResultQueryData = (headerData, bodyData) => {
      resultQueryData = {
        title : 'Final',
        headerData : headerData,
        bodyData   : bodyData
      }
    };

    try{
      if(fromData){
        const fromTable = database.getTable(fromData);
        if (!fromTable){
          throw createErrorObj('E301', 'Missing From Table Name');
        }
        
        stepCount++;
        const headerData = fromTable.columns.map((item,index) => {
          return {
            index : index + 1,
            key : fromTable.name + '.' + item.field,
            value : item.field
          }
        });

        const bodyData = fromTable.rows.map((rowItem) => {
          return headerData.map((headerItem) => {
            return {
              index : headerItem.index,
              key : fromTable.name + '.' + headerItem.value,
              value : rowItem[headerItem.value]
            }
          });
        });

        const step = {
          id : stepCount,
          title : 'Step' + stepCount,
          headerData : headerData,
          bodyData   : bodyData
        }

        resultData.step.push(step);
        setFinalResultQueryData(headerData, bodyData);
      }

      if(joinData){

        joinData.forEach((joinItem) => {
          const {joinOperator, joinTable, conditionTable1, conditionColumn1, conditionTable2, conditionColumn2} = joinItem;
          const firstCondition = conditionTable1+'.'+conditionColumn1;
          const secondCondition = conditionTable2+'.'+conditionColumn2;

          const joinedTable = database.getTable(joinTable);

          let headerData = deepCopyData(resultQueryData.headerData);
          let bodyData   = deepCopyData(resultQueryData.bodyData);

          let standardTableCondtion;
          let joinTableCondtion;

          if(joinedTable.columns.find((item) => joinedTable.name+"."+item.field === firstCondition) && headerData.find((item) => item.key === secondCondition)){
            joinTableCondtion = firstCondition;
            standardTableCondtion = secondCondition;
          }else if(joinedTable.columns.find((item) => joinedTable.name+"."+item.field === secondCondition) && headerData.find((item) => item.key === firstCondition)){
            joinTableCondtion = secondCondition;
            standardTableCondtion = firstCondition;
          }else{
            throw createErrorObj('E302','Not Found Condition in Table');
          }

          stepCount++;

          /** header Merge */
          joinedTable.columns.forEach((item) => {
            headerData.push({
              index : headerData.length + 1,
              key : joinedTable.name+'.'+item.field,
              value : item.field
            });
          });


          /** Get Value that matching condition of table */
          const getConditionValue = (row, condition) => row.find((_) => _.key === condition)?.value;

          /** Get Row that matching join condition of table */
          const getJoinRow = (targetData, condition, conditionValue ) => {
            return targetData.filter((targetDataRow) => {
              const findRow = targetDataRow.find((item) => item.key === condition && item.value === conditionValue);
              return Boolean(findRow);
            });
          };


          //header 기준으로 bodydata Item 생성
          const createBodyDataItem = () => {
            let resultObject = deepCopyData(headerData);
            resultObject.map((item) => {
              item.value = "NULL";
              return item;
            });
            return resultObject;
          };

          //sourceObject의 key값과 targetObject의 key 값이 같은 경우 sourceObject의 value를 targetObject의 value로 데이터를 복사
          const objectCopy = ( targetObject, sourceObject ) => {
            sourceObject.forEach((sourceObjectItem) => {
              targetObject.map((targetObjectItem) => {
                if ( targetObjectItem.key === sourceObjectItem.key ){
                  targetObjectItem.value = sourceObjectItem.value;
                }
              });
            });
          };

          //join되려는 테이블의 row값을 bodyData와 같은 형식으로 변경
          const createConvertJoinData = () => {
             //table row의 형태를 변경
             let convertJoinedData = [];
             joinedTable.rows.forEach((joinedTableRow) => {
               let convertJoinedRow = [];
               Object.keys(joinedTableRow).forEach((item,index) => {
                 convertJoinedRow.push({
                   index : index + 1,
                   key : `${joinedTable.name}.${item}`,
                   value : joinedTableRow[item]
                 });
               });
               convertJoinedData.push(convertJoinedRow);
             });
             return convertJoinedData;
          };


          if(joinOperator === "INNER JOIN"){

            const tempArray = [];
            const convertJoinData = createConvertJoinData();

            bodyData.forEach((bodyDataRow) => {
              const conditionValue = getConditionValue(bodyDataRow, standardTableCondtion);
              const filteredRow = getJoinRow(convertJoinData, joinTableCondtion, conditionValue);

              if ( filteredRow.length > 0 ){
                filteredRow.forEach((filteredRowItem) => {
                  let resultBodyData = createBodyDataItem();
                  objectCopy(resultBodyData, filteredRowItem);
                  objectCopy(resultBodyData, bodyDataRow);
                  tempArray.push(resultBodyData);
                });
              }
            });
            bodyData = tempArray;

          }else if(joinOperator === "LEFT OUTER JOIN"){
            let tempArray = [];
            let convertJoinedData = createConvertJoinData();

            bodyData.forEach((bodyDataRow) => {
                   
              const conditionValue = getConditionValue(bodyDataRow,standardTableCondtion);
              const filteredRow = getJoinRow(convertJoinedData, joinTableCondtion, conditionValue);

              if ( filteredRow.length > 0 ){
                filteredRow.forEach((filteredRowItem) => {
                  let resultBodyData = createBodyDataItem();
                  objectCopy(resultBodyData, filteredRowItem);
                  objectCopy(resultBodyData, bodyDataRow);
                  tempArray.push(resultBodyData);
                });
              }else{
                let resultBodyData = createBodyDataItem();
                objectCopy(resultBodyData, bodyDataRow);
                tempArray.push(resultBodyData);
              }
              bodyData = tempArray;
            });

          }else if(joinOperator === "RIGHT OUTER JOIN"){
            let tempArray = [];
            joinedTable.rows.forEach((joinedRow) => {

              //table row의 형태를 변경
              let convertJoinedRow = [];
              Object.keys(joinedRow).forEach((item,index) => {
                convertJoinedRow.push({
                  index : index + 1,
                  key : `${joinedTable.name}.${item}`,
                  value : joinedRow[item]
                });
              });

              const conditionValue = getConditionValue(convertJoinedRow, joinTableCondtion);
              const filteredRow = getJoinRow(bodyData, standardTableCondtion, conditionValue);
              
              if ( filteredRow.length > 0 ){
                filteredRow.forEach((filteredRowItem) => {
                  let resultBodyData = createBodyDataItem();
                  objectCopy(resultBodyData, filteredRowItem);
                  objectCopy(resultBodyData, convertJoinedRow);
                  tempArray.push(resultBodyData);
                });
              }else{
                let resultBodyData = createBodyDataItem();
                objectCopy(resultBodyData, convertJoinedRow);
                tempArray.push(resultBodyData);
              }
            });
            bodyData = tempArray;
          }else{
            //FULL OUTER JOIN(LEFT OUTER JOIN + RIGHT ONLY)

            //LEFT OUTER JOIN START
            let tempArray = [];
            let convertJoinedData = createConvertJoinData();

            bodyData.forEach((bodyDataRow) => {
              const conditionValue = getConditionValue(bodyDataRow,standardTableCondtion);
              const filteredRow = getJoinRow(convertJoinedData, joinTableCondtion, conditionValue);

              if ( filteredRow.length > 0 ){
                filteredRow.forEach((filteredRowItem) => {
                  let resultBodyData = createBodyDataItem();
                  objectCopy(resultBodyData, filteredRowItem);
                  objectCopy(resultBodyData, bodyDataRow);
                  tempArray.push(resultBodyData);
                });
              }else{
                let resultBodyData = createBodyDataItem();
                objectCopy(resultBodyData, bodyDataRow);
                tempArray.push(resultBodyData);
              }
            });
            //LEFT OUTER JOIN END

            //RIGHT ONLY START
            convertJoinedData.forEach((convertJoinedRow) => {
              const conditionValue = getConditionValue(convertJoinedRow,joinTableCondtion);
              const filteredRow = getJoinRow(bodyData, standardTableCondtion, conditionValue);

              if ( filteredRow.length < 1){
                let resultBodyData = createBodyDataItem();
                objectCopy(resultBodyData, convertJoinedRow);
                tempArray.push(resultBodyData);
              }
            });
            //RIGHT ONLY END

            bodyData = tempArray;
          }

          const step = {
            id : stepCount,
            title : 'Step' + stepCount,
            headerData : headerData,
            bodyData   : bodyData,
            highlightColumnKey : [standardTableCondtion, joinTableCondtion]
          }

          resultData.step.push(step);
          setFinalResultQueryData(headerData, bodyData);

        });
      }

      if(whereData && whereData.length > 0){
        const whereFinalResult = 'where-fianl-result';
        const conditionDash = 'condition-';

        let headerData   = deepCopyData(resultQueryData.headerData);
        let bodyData   = deepCopyData(resultQueryData.bodyData);
        let fianlResultBodyData = [];

        // Helper function to evaluate a single condition
        const evaluateCondition = (row, condition) => {
          const columnKey = condition.whereTable + '.' + condition.whereColumn;
          const columnData = row.find((item) => item.key === columnKey);

          if (!columnData) return false; // If column is not found, condition fails

          const value = columnData.value;
          const conditionValue = condition.whereCondition.toUpperCase();

          switch (conditionValue) {
            case "IS NULL":
              return value === null || value === "NULL";
            case "IS NOT NULL":
              return value !== null && value !== "NULL";
            default:
              return false;
          }
        };

        // Recursive function to evaluate the entire whereData
        const evaluateWhereData = (row, whereData) => {
          let rowObject = deepCopyData(row);
          let processConditionResult = [];
          let result = evaluateCondition(rowObject, whereData[0]); // Evaluate the first condition
          processConditionResult.push(result);
          rowObject.push({
            index : rowObject.length + 1,
            key : conditionDash + 0,
            value : result
          });
      
          for (let i = 1; i < whereData.length; i++) {
            const logicOperator = whereData[i].whereLogicOperator.toUpperCase();
            const conditionResult = evaluateCondition(rowObject, whereData[i]);
            rowObject.push({
              index : rowObject.length + 1,
              key : conditionDash + i,
              value : conditionResult
            });
            processConditionResult.push(logicOperator);
            processConditionResult.push(conditionResult);

            if (logicOperator === "AND") {
              result = result && conditionResult;
            } else if (logicOperator === "OR") {
              result = result || conditionResult;
            }
          }
      
          processConditionResult.push('=');
          processConditionResult.push(result);
          rowObject.push({
            index : rowObject.length + 1,
            key : whereFinalResult,
            // value : result
            value : processConditionResult.join(' ')
          });

          //where 조건에 충족하는 데이터만 최종 결과 배열에 따로 저장
          if ( result ){
            fianlResultBodyData.push(row);
          }

          return rowObject;
        };

        

        //Header를 사전에 추가(...condition ,fianl result)
        let highlightColumnKey = [];
        for( let i = 0 ; i < whereData.length + 1 ; i ++){
          const key = ( i >= whereData.length ) ? whereFinalResult : conditionDash + i;
          const value = ( i >= whereData.length ) ? whereFinalResult
          : (whereData[i].whereTable + '.' + whereData[i].whereColumn + ' ' + whereData[i].whereCondition).toUpperCase();

          highlightColumnKey.push(key);
          headerData.push({
            index : headerData.length + 1,
            key : key,
            value : value.trim()
          });
        }

        bodyData = bodyData.map((row) => evaluateWhereData(row, whereData));

        stepCount++;
        const step = {
          id : stepCount,
          title : 'Step' + stepCount,
          headerData : headerData,
          bodyData   : bodyData,
          highlightColumnKey : highlightColumnKey
        }
        resultData.step.push(step);

        //step의 bodydate는 where의 false데이터도 보이기 때문에,
        //where가 정상적으로 수행된 bodyData를 따로 저장하여 사용
        setFinalResultQueryData(resultQueryData.headerData, fianlResultBodyData);
      }

      if(orderbyData){

        orderbyData.forEach((orderbyItem) => {

          const columnKey = orderbyItem.orderbyTable+'.'+orderbyItem.orderbyColumn;
          const isAscending = (orderbyItem.orderbySort === 'ASC') ? true : false;

          const findColumn = resultQueryData.headerData.filter(headerItem => headerItem.key === columnKey);
          if ( !findColumn || findColumn.length < 1){
            throw createErrorObj('E304', 'Not Found OrderBy Condition');
          }

          stepCount++;
          
          const sortDataByKey = (data, columnKey, isAscending = true) => {
            return data.sort((a, b) => {
              const valueA = a.find(item => item.key === columnKey)?.value ?? "NULL";
              const valueB = b.find(item => item.key === columnKey)?.value ?? "NULL";
          
              // NULL 처리: ASC -> 뒤로, DESC -> 앞으로
              if (valueA === "NULL" && valueB !== "NULL") {
                return isAscending ? 1 : -1;
              }
              if (valueB === "NULL" && valueA !== "NULL") {
                return isAscending ? -1 : 1;
              }
              if (valueA === "NULL" && valueB === "NULL") {
                return 0; // 둘 다 NULL인 경우
              }
          
              // value의 타입이 숫자와 문자열 혼합 가능성을 처리
              const normalizedA = typeof valueA === "number" ? valueA : valueA.toString().toLowerCase();
              const normalizedB = typeof valueB === "number" ? valueB : valueB.toString().toLowerCase();
          
              if (typeof normalizedA === "number" && typeof normalizedB === "number") {
                return isAscending ? normalizedA - normalizedB : normalizedB - normalizedA;
              } else {
                return isAscending
                  ? normalizedA.localeCompare(normalizedB)
                  : normalizedB.localeCompare(normalizedA);
              }
            });
          };

          let headerData = deepCopyData(resultQueryData.headerData);
          let bodyData   = deepCopyData(resultQueryData.bodyData);
          bodyData = sortDataByKey(bodyData, columnKey, isAscending);

          const step = {
            id : stepCount,
            title : 'Step' + stepCount,
            headerData : headerData,
            bodyData   : bodyData,
            highlightColumnKey : [columnKey]
          }

          resultData.step.push(step);
          setFinalResultQueryData(headerData, bodyData);
        });
      }


    }catch(error){
      const errorObject ={
        errorCode    : error.code,
        errorMessage : error.message
      }
      resultData.error = errorObject;

    }finally{
      if(!resultData.error) resultData.final = resultQueryData;
    }

    setResult(resultData);
  }

  const createTableTag = () => {
    const tables = database.table.map((item,index) => {
      const headerData = Object.keys(item.columns[0]).map((columnItem,columnIndex) => {
        return {
          index : columnIndex + 1,
          key : item.name + '.' + columnItem,
          value : columnItem
        };
      });

      const bodyData = item.columns.map((columnItem, columnIndex) => {
        return headerData.map((headerItem,headerIndex) => {
          return {
            index : headerItem.index,
            key : item.name + '.' + headerItem.value,
            value : columnItem[headerItem.value]
          }
        });
      });

      let tableHtml = createTableHtml(item.name, headerData, bodyData, {margin: '20px'});
      return tableHtml;
    });
    setTableElements(tables);
  };

  const drawRelations = () => {
    const relationTable = database.getRelation();
    
    if (svgRef.current) svgRef.current.innerHTML = ''; // 기존 SVG 초기화
    const svg = svgRef.current;

    relationTable.forEach((rel) => {
      const sourceElement = document.querySelector(`.table-relation-info-wrap > [data-table-relation-info="${rel.sourceTable.tableName}"]`);
      const targetElement = document.querySelector(`.table-relation-info-wrap > [data-table-relation-info="${rel.targetTable.tableName}"]`);

      if (sourceElement && targetElement) {
        const setRelationId = (trNodes, relationId, tableName, attribute, isPrimaryKey) => {
          isPrimaryKey = isPrimaryKey ? 'PRIMARY KEY' : '';
          for( let i = 0 ; i < trNodes.length ; i++ ){
            const trNode = trNodes[i];
            const checkField = (trNode.querySelector(`[data-column-key="${tableName+".field"}"]`)?.textContent === attribute);
            const checkKey = (trNode.querySelector(`[data-column-key="${tableName+".key"}"]`)?.textContent === isPrimaryKey);

            if (checkField && checkKey){
              trNode.setAttribute('data-id', relationId);
              break;
            }
          }
        };

        let trNodes;
        trNodes = sourceElement.querySelectorAll('tr');
        setRelationId(trNodes, rel.id, rel.sourceTable.tableName, rel.sourceTable.attribute, true);

        trNodes = targetElement.querySelectorAll('tr');
        setRelationId(trNodes, rel.id, rel.targetTable.tableName, rel.targetTable.attribute, false);

        //Create SVG Group Tag 
        const svgNS = "http://www.w3.org/2000/svg";
        let gTag = document.createElementNS(svgNS,"g");
        gTag.setAttributeNS(null, 'data-id', rel.id);
        gTag.setAttributeNS(null, 'stroke', 'grey');
        gTag.setAttributeNS(null, 'strokeWidth', '3');

        //Connection Bottom Line
        const bottomSpace = 15;
        const sourceRect = sourceElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        const sourceX = parseInt(sourceRect.left + (sourceRect.width/2),10);
        const sourceY = parseInt(sourceRect.height,10) + 20; //height + margin
        const targetX = parseInt(targetRect.left + (targetRect.width/2),10);
        const targetY = parseInt(targetRect.height,10) + 20; //height + margin
        
        const maxY   = (( sourceY >= targetY ) ? sourceY : targetY ) + bottomSpace;
        const horizonLine = targetX;

        const lineDraw = 'M'+sourceX+' '+sourceY + ' V'+maxY + ' H'+horizonLine + ' V' + targetY;

        let pathTag = document.createElementNS(svgNS,"path");
        pathTag.setAttributeNS(null, 'd', lineDraw);
        pathTag.setAttributeNS(null, 'fill', 'none');


        //StartNode Marker
        const markerSpace = 10;
        let startMaker = document.createElementNS(svgNS,"polygon");
        const startPoint = "" + (sourceX - markerSpace)+","+(sourceY + markerSpace) + " " + (sourceX + markerSpace)+","+(sourceY+markerSpace); 
        startMaker.setAttributeNS(null, 'points', startPoint);

        //EndNode Marker
        let endMaker = document.createElementNS(svgNS,"polygon");
        // points="10,10 100,10 50,10, 10,100, 50,10, 100,100, 50,10"
        /**
         * StartXY, EndXY, MiddleX, MaxY, MiddleXY, MaxX, MiddleXY
         *    1       2       3       4       3      5        3
         * 
         *  4       5
         *   \     /
         *    \   /
         *     \ /
         * 1 ---3---2
         */
        const endPoint = "" 
                            + (targetX - markerSpace)+","+(targetY + markerSpace) 
                            + " " + (targetX + markerSpace)+","+(targetY+markerSpace)
                            + " " + (targetX)+","+(targetY+markerSpace)
                            + " " + (targetX - markerSpace)+","+(targetY)
                            + " " + (targetX)+","+(targetY+markerSpace)
                            + " " + (targetX + markerSpace)+","+(targetY)
                            + " " + (targetX)+","+(targetY+markerSpace)
                            ; 
        endMaker.setAttributeNS(null, 'points', endPoint);

        gTag.appendChild(pathTag);
        gTag.appendChild(startMaker);
        gTag.appendChild(endMaker);

        svg.appendChild(gTag);
      }
    });
  };

  const settingHoverEvent = () => {
    /**
     * Sets an event when the mouse hovers over table relationship information.
     */    
    const trNodes = document.querySelectorAll('.table-relation-info-wrap .table-template tbody tr');

    const relationHover = (trNode, isHover) => {
      if ( trNode.hasAttribute('data-id') ){
          const dataId = trNode.getAttribute('data-id');
          const selectAll = document.querySelectorAll(`.table-area-wrap [data-id=${dataId}]`);
          selectAll.forEach((item) => {
              if ( item.tagName === 'TR'){
                isHover ? item.classList.add('tr-hover-color') : item.classList.remove('tr-hover-color');
              }else if ( item.tagName === 'g'){
                isHover ? item.setAttributeNS(null, 'stroke', 'red') : item.setAttributeNS(null, 'stroke', 'grey');
              }
          });
      }
    }

    for(let i = 0 ; i < trNodes.length ; i++){
      const trNode = trNodes[i];
      trNode.addEventListener("mouseenter", () =>{
          relationHover(trNode, true);
      });
      trNode.addEventListener("mouseleave", () => {
          relationHover(trNode, false);
      });
    }
  };

  const changeWindowRedraw = () => {
    drawRelations();
  }

  const toggleVersionInfo = () => {
    setIsVersionVisible(!isVersionVisible);
  };

  // FROM 테이블 선택 핸들러
  const handleFromChange = (event) => {
    setFromTable(event.target.value);
    setJoinTables([]); // FROM 변경 시 JOIN 초기화
  };


  useEffect(() => {
    createTableTag();
  }, []);

  useEffect(() => {
    if (tableWrapperRef.current) {
      drawRelations();
      settingHoverEvent();
      window.addEventListener('resize', changeWindowRedraw);
    }
    return () => window.removeEventListener('resize', changeWindowRedraw);
  }, [tableElements, changeWindowRedraw]);

  
  return (
    <div className="vsqd-container">
      <div className="area-wrap">
        <div className="project-info">
          <h2>{project.title}</h2>
          <p className="project-info-description">
            {project.description}<br />
            - Check the table relation information and choose query content.<br />
            - Click on Run button to execute your query.
          </p>
          {/* <div className="project-info-details">
            <span className="toggle-version-button" onClick={toggleVersionInfo}>{isVersionVisible ? "Version Info ▲" : "Version Info ▼"}</span>
            {isVersionVisible && (
              <div className="toggle-version-description">
              <p>v1. Visual Select Query Data open</p>
              <p>Future updates will include more features and optimizations.</p>
            </div>
            )}
          </div> */}
        </div>
      </div>

      <div className="area-wrap">
        <div className="header">
          <h4>Table Relation Information</h4>
        </div>
        <div className="table-area-wrap">
          <div className="table-relation-info-wrap" ref={tableWrapperRef}>
            {tableElements}
          </div>
          <div className="table-relation-wrap">
            <svg width={1800} height={340} ref={svgRef}>
            </svg>
          </div>
        </div>
      </div>

      <div className="area-wrap">
        <div className="header">
          <h4>Build SELECT Query</h4>
        </div>
        <div className="select-query-area">
          <div className="select-area">
              <p>SELECT</p>
              <div className="select-row">
                  *
              </div>
          </div>
          <div className="from-area">
              <p>FROM</p>
              <div className="from-row">
                  <select title="select-table" className="select-table" onChange={handleFromChange}>
                      <option>EMPLOYEE</option>
                      <option>DEPARTMENT</option>
                      <option>JOBS</option>
                  </select>
              </div>
          </div>
          <KeywordWrapper title="join" maxRow={2} isReset={isReset} setIsReset={setIsReset} fromTable={fromTable} joinTables={joinTables} setJoinTables={setJoinTables}/>
          <KeywordWrapper title="where" maxRow={2} isReset={isReset} setIsReset={setIsReset} />
          <KeywordWrapper title="orderby" maxRow={1} isReset={isReset} setIsReset={setIsReset} />
        </div>
        <div className="button-wrap">
          <span className="reset-button" onClick={resetAll}>Reset</span>
          <span className="run-button" onClick={runQuery}>Run</span>
        </div>
      </div>

      {result && (
        <div className="area-wrap">
        <div className="header">
          <h4>Result</h4>
        </div>
        {result.step.map((item,index) => (
          <div className="result-area-wrap" key={item.id}>
            <h4>{item.title}</h4>
            {createTableHtml('', item.headerData, item.bodyData, item.style, item.highlightColumnKey)}
          </div>
          ))}
        {result.error && (
          <div className="result-area-wrap error">
            <h4>Error</h4>
            <p>
              Error Message({result.error.errorCode})<br />
              Error Cause : {result.error.errorMessage}
            </p>
          </div>
        )}
        {result.final && (
          <div className="result-area-wrap final">
            <h4>Final Result</h4>
            {createTableHtml('', result.final.headerData, result.final.bodyData)}
          </div>
        )}
        
      </div>
      )}
    </div>
  );
}

export default VisualSelectQueryData;