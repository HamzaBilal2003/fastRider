import React from "react";
import SettingHeader from "./component/SettingHeader";
import General from "./portions/General";

const Setting  : React.FC = () => {
  const url ='General'
  return (
    <>
      <SettingHeader url={url} />
      <General/>
    </>
  );
};

export default Setting;
