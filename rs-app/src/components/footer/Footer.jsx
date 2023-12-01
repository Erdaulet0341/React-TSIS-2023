import React from "react";
import {
  Box,
  FooterContainer,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <h1
        style={{
          color: "#d3e631",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Remote shop for bying and selling any product online!
      </h1>
      <FooterContainer>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink
              target="_blank"
              href="https://www.instagram.com/didar_mr_malignant/"
            >
              Didar
            </FooterLink>
            <FooterLink
              target="_blank"
              href="https://www.instagram.com/abi.arin/"
            >
              Aryn
            </FooterLink>
            <FooterLink target="_blank" href="https://www.instagram.com/e7abdurakhman/">Yerdaulet</FooterLink>
          </Column>
          <Column>
            <Heading>Privacy&Terms</Heading>
            <FooterLink target="_blank" href="https://docs.google.com/document/d/1GUtrP9hCMxFVcprpG6WO3izqcwZAjRPlidCzZ5hwL6g/edit?usp=sharing">Privacy Policy</FooterLink>
            <FooterLink target="_blank" href="https://docs.google.com/document/d/1WaKpXLrKSM0q2-i4tcr16KDsY24Lo4WhEI80-p7Prjs/edit?usp=sharing">Terms of Use</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink target="_blank" href="https://2gis.kz/astana/geo/9570771978420226">Astana</FooterLink>
            <FooterLink target="_blank" href="https://2gis.kz/almaty/geo/9430034490064971/76.894131%2C43.24278?m=76.89413%2C43.242781%2F12">Almaty</FooterLink>
            <FooterLink target="_blank" href="https://2gis.kz/shymkent/geo/22659358439328791/69.587038%2C42.315448?m=69.587036%2C42.315446%2F11">Shymkent</FooterLink>
            <FooterLink target="_blank" href="https://2gis.kz/taraz?m=71.392639%2C42.89956%2F11">Taraz</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink target="_blank" href="https://www.facebook.com/">
              <i className="fab fa-facebook-f">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink target="_blank" href="https://www.instagram.com/">
              <i className="fab fa-instagram">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink target="_blank" href="https://twitter.com/">
              <i className="fab fa-twitter">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink target="_blank" href="https://www.youtube.com/">
              <i className="fab fa-youtube">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </FooterContainer>
    </Box>
  );
};
export default Footer;
