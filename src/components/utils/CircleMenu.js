import React, { useState } from "react";

const CircleMenu = () => {
  const [show, setShow] = useState(false);
  const handler = () => {
    setShow(!show);
  };
  return (
    <div
      id="circularMenu"
      className={show ? "circular-menu active" : "circular-menu"}>
      <div className="floating-btn" onClick={handler}>
        <i class="fas fa-comment-dots"></i>
      </div>

      <menu className="items-wrapper">
        <a
          target="_blank"
          rel="noreferrer"
          href="tel:+94 77 242 1363"
          className="menu-item  fas fa-phone"
        />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/lurk.lk/"
          className="menu-item fab fa-facebook-f"></a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://wa.me/94772421363"
          className="menu-item fab fa-whatsapp"></a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://instagram.com/lurk.lk_official"
          className="menu-item fab fa-instagram"
        />
      </menu>
    </div>
  );
};

export default CircleMenu;
