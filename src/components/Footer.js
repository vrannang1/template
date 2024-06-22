import React from "react";


export default function Footer() {
  return (
    <footer id="footer" className="uk-section uk-section-secondary">
    <div className="uk-container">
      <div className="uk-grid uk-grid-large" data-uk-grid>
        <div className="uk-width-1-2@m">
          <h5>OUR COMPANY</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud cillum dolore eu fugiat nulla contact to: <a href="#0" title="">info@company.com</a></p>
          <div>
            <a href="#0" className="uk-icon-button" data-uk-icon="twitter">{''}</a>
            <a href="#0" className="uk-icon-button" data-uk-icon="facebook">{''}</a>
            <a href="#0" className="uk-icon-button" data-uk-icon="instagram">{''}</a>
          </div>
        </div>
        <div className="uk-width-1-6@m">
          <h5>PRODUCTS</h5>
          <ul className="uk-list">
            <li>Big Data</li>
            <li>Marketing</li>
            <li>Analytics</li>
            <li>AI Lab</li>
          </ul>
        </div>
        <div className="uk-width-1-6@m">
          <h5>OUR COMPANY</h5>
          <ul className="uk-list">
            <li>Team</li>
            <li>Work</li>
            <li>Culture</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="uk-width-1-6@m">
          <h5>OUR OFFICES</h5>
          <ul className="uk-list">
            <li>London</li>
            <li>Chicago</li>
            <li>Dubai</li>
            <li>Brussels</li>
          </ul>
        </div>
        
      </div>
    </div>
    
    <div className="uk-text-center uk-padding uk-padding-remove-horizontal">
      <span className="uk-text-small uk-text-muted">© 2019 Marketing Layout - <a href="https://github.com/zzseba78/Kick-Off">Created by KickOff</a> | Built with <a href="http://getuikit.com" title="Visit UIkit 3 site" target="_blank" rel="noreferrer" data-uk-tooltip><span data-uk-icon="uikit"></span></a></span>
    </div>
  </footer>
  );
}
