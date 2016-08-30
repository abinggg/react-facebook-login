import React, { PropTypes } from 'react';
import styles from '../styles/facebook.scss';

class FacebookLogin extends React.Component {

  static propTypes = {
    callback: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    scope: PropTypes.string,
    textButton: PropTypes.string,
    autoLoad: PropTypes.bool,
    size: PropTypes.string,
    fields: PropTypes.string,
    cssClass: PropTypes.string,
    version: PropTypes.string,
    icon: PropTypes.string,
    language: PropTypes.string,
  };

  static defaultProps = {
    textButton: 'Login with Facebook',
    scope: 'public_profile, email',
    xfbml: false,
    cookie: false,
    size: 'metro',
    fields: 'name',
    cssClass: 'kep-login-facebook',
    version: '2.3',
    language: 'en_US',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let fbRootContainer = document.getElementById('fb-root');
    
    if(fbRootContainer !== null) {
      let fbRoot = document.createElement('div');
          fbRoot.id = 'fb-root';

      document.body.appendChild(fbRoot);

      window.fbAsyncInit = () => {
        FB.init({
          appId: this.props.appId,
          xfbml: this.props.xfbml,
          cookie: this.props.cookie,
          version: 'v' + this.props.version,
        });

        if (this.props.autoLoad) {
          FB.getLoginStatus(this.checkLoginState);
        }
      };
    }
  }

  responseApi = (authResponse) => {
    FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken;
      this.props.callback(me);
    });
  };

  checkLoginState = (response) => {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.callback) {
        this.props.callback({ status: response.status });
      }
    }
  };

  click = () => {
    FB.login(this.checkLoginState, { scope: this.props.scope });
  };

  renderWithFontAwesome() {
    return (
      <div>
         <button
            className={this.props.cssClass + ' ' + this.props.size}
            onClick={this.click}>
          <i className={'fa ' + this.props.icon}></i> {this.props.textButton}
        </button>

        <style dangerouslySetInnerHTML={{ __html: styles }}></style>
      </div>
    )
  }

  render() {
    if (this.props.icon) {
      return this.renderWithFontAwesome();
    }

    return (
      <div>
        <button
            className={this.props.cssClass + ' ' + this.props.size}
            onClick={this.click}>
          {this.props.textButton}
        </button>
        
        <style dangerouslySetInnerHTML={{ __html: styles }}></style>
      </div>
    );
  }
}

export default FacebookLogin;
