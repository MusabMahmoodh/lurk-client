import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="copyright-area">
        <div className="container" style={{ backgroundColor: "#202020" }}>
          <Row>
            <Col className=" text-center text-lg-left" xs={12} md={4}>
              <div className="copyright-text">
                <p>
                  Copyright &copy;{new Date().getFullYear()}, All Right Reserved{" "}
                  <a href="mailto:lurk.stationery@gmail.com">Lurk</a>
                </p>
              </div>
            </Col>

            <Col className="text-center" xs={12} md={4}>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://lurk.lk/store/terms">
                      Terms And Condition
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://lurk.lk/store/privacy">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col className="text-center text-lg-right" xs={12} md={4}>
              <div className="copyright-text">
                <p>
                  Developed By:
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://wa.me/94772421363">
                    Musab Mahmoodh
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
