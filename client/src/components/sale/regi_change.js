import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { grey } from "@mui/material/colors";
import { blue } from "@mui/material/colors";

function Regi_change(props) {
  return (
    <div className="regi_select">
      <div className="regi_title" style={{display:"flex", alignItems:"center"}}>
        교환
        {props.change ? (
          <i
            style={{ color: "#2748b0", paddingLeft: "0.5vw" }}
            class="fa-solid fa-check"
          ></i>
        ) : (
          <span style={{ color: "red" }}>*</span>
        )}
      </div>
      <div className="regi_change">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="가능"
              onClick={(e) => props.setChange(e.target.value)}
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.5vw",
                    },
                    color: grey[600],
                    "&.Mui-checked": {
                      color: blue[900],
                    },
                  }}
                />
              } // 스타일을 적용한 라디오 버튼
              label="가능"
            />
            <FormControlLabel
              value="불가"
              onClick={(e) => props.setChange(e.target.value)}
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.5vw",
                    },
                    color: grey[600],
                    "&.Mui-checked": {
                      color: blue[900],
                    },
                  }}
                />
              } // 스타일을 적용한 라디오 버튼
              label="불가"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default Regi_change;
