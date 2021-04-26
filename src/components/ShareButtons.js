import React, { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
const ShareButtons = ({ name, shareMedia, description }) => {
  const [open, setOpen] = useState(false);
  const [configs, setConfigs] = useState({
    url: "",
    title: "",
    shareImage: "",
    size: "1.5rem",
    description: "",
  });
  useEffect(() => {
    console.log(name, shareMedia);
    setConfigs({
      ...configs,
      url: String(window.location),
      title: name,
      shareImage: shareMedia,
      description: description,
    });
  }, [name]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div>
        <span style={{ margin: "0 2px" }}>
          <FacebookShareButton url={configs.url} quote={configs.title}>
            <FacebookIcon size={configs.size} round={true} />
          </FacebookShareButton>
        </span>

        <span style={{ margin: "0 2px" }}>
          <TwitterShareButton url={configs.url} title={configs.title}>
            <TwitterIcon size={configs.size} round={true} />
          </TwitterShareButton>
        </span>

        <span style={{ margin: "0 2px" }}>
          <WhatsappShareButton
            url={configs.url}
            title={configs.title}
            separator="🔥..">
            <WhatsappIcon size={configs.size} round={true} />
          </WhatsappShareButton>
        </span>

        <span style={{ margin: "0 2px" }}>
          <TelegramShareButton
            title={configs.title}
            url={configs.url}
            windowWidth={750}
            windowHeight={600}>
            <TelegramIcon size={configs.size} round={true} />
          </TelegramShareButton>
        </span>
      </div>
      {/*  */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10px",
        }}>
        <i
          class="fa fa-share-alt"
          style={{ color: "#18BC9C", fontSize: "20px" }}></i>
      </div>
    </div>
  );
};

export default ShareButtons;
