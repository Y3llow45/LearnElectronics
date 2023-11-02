import './Footer.css'


function Footer() {

    return (
        <div className='my-footer'>
            <hr className="my-line"></hr>
            <p>Made with <span className='heart' role='img' aria-label='heart'>❤️</span> by <a className='username' href='https://github.com/Y3llow45'>Y3llow45</a></p>
            <div className='big-div'>
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
            </div>
            <div><img className='to-the-top' src='../arrow.png' onClick={() => {
                        console.log('clicked')
                        window.scrollTo({
                            top: 0, behavior: 'smooth'
                          });
                    }}></img>
            </div>
            </div>
            <p>© 2023 LearnElectronics</p>
            
        </div>
    );
}

export default Footer;