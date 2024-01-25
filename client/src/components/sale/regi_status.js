import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { grey } from "@mui/material/colors";
import { blue } from "@mui/material/colors";

function Regi_status(props) {
  return (
    <div className="regi_select">
      <div className="regi_title" style={{ paddingTop: "0.8vw" }}>
        상품상태
        {props.status ? (
          <i
            style={{ color: "#2748b0", paddingLeft: "0.5vw" }}
            class="fa-solid fa-check"
          ></i>
        ) : (
          <span style={{ color: "red" }}>*</span>
        )}
      </div>
      <div className="regi_status">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="새상품 (미사용)"
              onClick={(e) => props.setStatus(e.target.value)}
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
              label="새상품 (미사용)"
            />
            <FormControlLabel
              value="사용감 없음"
              onClick={(e) => props.setStatus(e.target.value)}
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
              label="사용감 없음"
            />
            <FormControlLabel
              value="사용감 적음"
              onClick={(e) => props.setStatus(e.target.value)}
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
              label="사용감 적음"
            />
            <FormControlLabel
              value="사용감 많음"
              onClick={(e) => props.setStatus(e.target.value)}
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
              label="사용감 많음"
            />
            <FormControlLabel
              value="고장/파손 상품"
              onClick={(e) => props.setStatus(e.target.value)}
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
              label="고장/파손 상품"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default Regi_status;
