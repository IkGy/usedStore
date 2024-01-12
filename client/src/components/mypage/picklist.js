import { useEffect, useState } from "react";

function Picklist() {
  const [data, setData] = useState ([
    {
      
    },
  ])

  const [end ,setEnd] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isInitialLoad) {
      setTimeout(() => {
        setEnd("end");
      }, 400);

      return () => {
        setEnd("end2");
      };
    } else {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);
  return(
    <div>
      찜 목록
      <div>
        {data.map((a, i)=> {
          return(
            <div>
              
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Picklist