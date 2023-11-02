import './Footer.css'


function Footer() {

    return (
        <div className='my-footer'>
            <hr className="my-line"></hr>
            <p>Made with <span className='heart' role='img' aria-label='heart'>❤️</span> by <a className='username' href='https://github.com/Y3llow45'>Y3llow45</a></p>
            <div className='footer-div'>
                <div className='tiny-div'>
                    <a className='footer-link' href='https://github.com/Y3llow45/LearnElectronics'>About this project</a>
                    <a className='footer-link' href='https://github.com/Y3llow45/LearnElectronics/issues/new'>Report issue/bug</a>
                    <a className='footer-link' href='https://github.com/Y3llow45/LearnElectronics/pulls'>Contribute to this project</a>
                </div>
                <div className='tiny-div'>
                    <a className='footer-link' href='/'>Visit Home</a>
                    <a className='footer-link' href='/lessons/0'>Visit Lessons</a>
                    <a className='footer-link' href='/signup'>Visit Sign Up</a>
                </div>
                <button
                    id="backToTopBtn"
                    onClick={() => {
                        console.log('clicked')
                        window.scroll({
                            top: 0
                          });
                    }}
                >
                  Back to Top
                </button>
            </div>
            <p>© 2023 LearnElectronics</p>
        </div>
    );
}

export default Footer;