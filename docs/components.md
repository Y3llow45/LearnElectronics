## Add lessons component
This component creates lessons. Users need to have account and be logged in.

User can choose lesson title and category
```javascript
<input type='title' name='title' placeholder='title' value={this.state.title} onChange={this.handleInputChange} className='input-form add-input-form' required/>
<select required name='category' className='input-form add-select' value={this.state.category} onChange={this.handleInputChange}>
    <option value='lessons'>Lessons</option>
    <option value='electric-components'>Electric Components</option>
    <option value='microcontrollers'>Microcontrollers</option>
</select>
```

User can write lesson's content
```javascript
<Editor editorState={this.state.editorState} onChange={this.onChange} plugins={plugins} ref={(element) => { this.editor = element;}}/>
```

User can style lesson's content and add images
```javascript
<ImageAdd editorState={this.state.editorState} onChange={this.onChange} modifier={imagePlugin.addImage}/>
<Toolbar />
```

User can add lesson with a click of a button
```javascript
<button  type='submit' className='form-submit add-form-submit' onClick={this.handleAdd}>Add</button>
```

Client side validations are made, lesson's content is converted to html and then send to LessonServices component which makes 
request to the server to create the lesson
```javascript
handleAdd = (event) => {
    event.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    if(this.state.title === '' || htmlContent === ''){
      displayError(addErrors.errorEmpty);
    }else if(this.state.title.length > 40){
      displayError(addErrors.titleLength);
    }else if(htmlContent.length < 120 || htmlContent.length > 10000) {
      displayError(addErrors.contentLength);
    } 
    else {
      add(this.state.title, htmlContent, this.state.category)
    }
  };
```

## Edit lessons component
This component edits lessons. Users need to have account and be logged in.

Component fetches all lessons created by the user
```javascript
componentDidMount() {
    try{
      getMine()
        .then(res => {
          if (res && Array.isArray(res)) { 
            this.setState({lessons: res})
          }
        })
    }catch(error) {
      console.log(error);
    }
  }
```

When user selects lesson it's content is converted from html to readable text with images
```javascript
handleLessonClick = (index, id) => {
  const selectedLesson = this.state.lessons[index];
  const editorState = convertHTMLToEditorContent(selectedLesson.content);
  console.log(id)
  this.setState({
      selectedLessonId: id,
      title: selectedLesson.title,
      category: selectedLesson.category,
      editorState: editorState,
  });
};
```

User can write lesson's content
```javascript
<Editor editorState={this.state.editorState} onChange={this.onChange} plugins={plugins} ref={(element) => { this.editor = element;}}/>
```

User can style lesson's content and add images
```javascript
<ImageAdd
  editorState={editorState}
  onChange={this.onChange}
  modifier={imagePlugin.addImage}
/>
<Toolbar />
```

User can delete lessons with a click of a button. There is delete confirmation dialog to ensure no lesson is deleted by mistake
```javascript
<button
  type='submit'
  className='red-button space-left'
  onClick={this.handleDelete}
>Delete
</button>
{this.state.showDeleteConfirmation && (
  <DeleteConfirmationDialog
    onConfirm={this.handleDeleteConfirmation}
  />
)}
```

Client side validations are made, lesson content is converted to html and then the lesson is send to LessonServices component
which makes request to the server to edit the lesson
```javascript
handleEdit = (event) => {
  event.preventDefault();
  const contentState = this.state.editorState.getCurrentContent();
  const htmlContent = stateToHTML(contentState);
  if(this.state.title === '' || htmlContent === ''){
    displayError(addErrors.errorEmpty);
  }else if(htmlContent.length < 120 || htmlContent.length > 5000) {
    displayError(addErrors.contentLength);
  }
  else {
    edit(this.state.selectedLessonId, this.state.title, htmlContent, this.state.category)
  }
};
```

## Footer component
This component shows usefull links and has back to the top button.

Github links
```javascript
<div className='tiny-div'>
  <a className='footer-link' href='https://github.com/Y3llow45/LearnElectronics'>About this project</a>
  <a className='footer-link' href='https://github.com/Y3llow45/LearnElectronics/issues/new'>Report issue/bug</a>
  <a className='footer-link' href='https://github.com/Y3llow45/LearnElectronics/pulls'>Contribute to this project</a>
</div>
```

Website links
```javascript
<div className='tiny-div'>
  <a className='footer-link' href='/'>Visit Home</a>
  <a className='footer-link' href='/lessons/0'>Visit Lessons</a>
  <a className='footer-link' href='/signup'>Visit Sign Up</a>
</div>
```

Back to the top button
```javascript
<img className='to-the-top' src='../arrow.png' onClick={() => {
  window.scrollTo({
    top: 0, behavior: 'smooth'
  });
}}></img>
```

## Form component
This component returns reusable form with username and password. Used both in sign up and sign in.

```javascript
<div>
  <input
      type="text"
      name="username"
      placeholder="Username"
      value={username}
      onChange={handleInputChange}
      className='input-form'
      required
  />
  <input
      type="password"
      name="password"
      placeholder="Password"
      value={password}
      onChange={handleInputChange}
      className='input-form'
      required
  />
</div>
```
## HandleInputChange component
This component updates states across the whole website with the given value.

```javascript
export const handleInputChangeComponent = (event, setStateCallback) => {
  const { name, value } = event.target;
  setStateCallback({ [name]: value });
};
```

## Header component
This component renders on top of every page and shows website's name, user's username and burger menu

Users can see websit's name
```javascript
<div className='left-div'>
  <h2 className='nav-h2-first'>Learn</h2>
  <h3 className="animate-charcter">Electronics</h3>
</div>
```

Logged in users are greeted with their username
```javascript
<div className='nav-user'>
    {username ? (
        <h3 className='nav-user-wellcome'>Welcome, {username}!</h3>
    ) : (
        <h3 className='nav-user-wellcome'>Welcome, Guest</h3>
    )}
</div>
```

If user is not logged in (guest), they can only see Home, Lessons and Sign up links in the burger menu.
Logged in users see all links in the burger menu. 
```javascript
<Menu
  isOpen={isMenuOpen}
  onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
  menuClassName="slide-menu"
  right
>
  <div className='hamburger-links'>
    <NavLink to='/' className='nav-link nav-link-hamburger' onClick={toggleMenu}>Home</NavLink>
    <NavLink to='/lessons/0' className='nav-link nav-link-hamburger' onClick={toggleMenu}>Lessons</NavLink>
    {username !== 'Guest' ? (
        <NavLink to='/add' className='nav-link nav-link-hamburger' onClick={toggleMenu}>Add lessons</NavLink>
    ): null}
    {username !== 'Guest' ? (
        <NavLink to='/edit' className='nav-link nav-link-hamburger' onClick={toggleMenu}>Edit lessons</NavLink>
    ): null}
    <NavLink to='/signup' className='nav-link nav-link-hamburger' onClick={toggleMenu}>Sign up</NavLink>
    {username !== 'Guest' ? (
        <NavLink to='' className='nav-link nav-link-hamburger' onClick={logout}>Log out</NavLink>
    ): null}
  </div>
</Menu>
```

## Home component
This component shows welcoming texts, images of electronics and 3d arduino model.

welcoming texts and images
```javascript
<p className="home-wlc-text big-text">At Learn Electronics, we're your gateway to the exciting world of electronics, microcontrollers,
and more. Whether you're a beginner or a pro, our platform offers resources to help you explore and learn!</p>
  <div className='el-components-div'>
    <p className='home-wlc-text el-components-text'>Electric components are the building blocks of electronics. They are the tiny parts
    that come together to create circuits and devices.</p>
    <img src='../c.jpg'></img>
  </div>
```

## Canvas component
This component renders 3d arduino model in the Home page.

```javascript
<Canvas dpr={[1,2]} camera={{fov:100}} className='arduino-canvas' shadows={false} >
  <ambientLight intensity={0.5} />
  <directionalLight position={[1, 1, 1]} intensity={1} />
  <PresentationControls speed={2} global>
    <Stage environment={null}>
      <Suspense fallback={null}>
        <Model scale={0.2} />
      </Suspense>
    </Stage>
  </PresentationControls>
</Canvas>
```

## LessonDetail component
This component displays lessons.

When component mounts, the selected lesson and user's role are fetched from the server.
```javascript
componentDidMount() {
  const { title } = this.props.match.params;
  getLessonDetail(title)
    .then(lesson => {
      this.setState({ lesson });
    })
    .catch(error => {
      console.log(error);
  });
  getRole()
    .then((data) => {
      this.setState({ userRole: data.role });
      console.log(data, data.role)
    })
    .catch((error) => {
      console.log(error);
    });
}
```

Show lesson's title and content
```javascript
{lesson ? (
  <div className="lesson-detail-center">
    <h1>{lesson[0].title}</h1> 
    <div dangerouslySetInnerHTML={{ __html: lesson[0].content }}></div>
  </div>
) : (
  <p>Loading...</p>
)}
```

If user is admin or moderator they can see delete button. There is also delete confirmation dialog to ensure no 
lesson is deleted by mistake
```javascript
{this.state.userRole === 'moderator' || this.state.userRole === 'admin' ? (
  <button
    type='submit'
    className='red-button space-left'
    onClick={this.handleDelete}
    >Delete
  </button>
) : null}
{this.state.showDeleteConfirmation && (
  <DeleteConfirmationDialog
    onConfirm={this.handleDeleteConfirmation}
  />
)}
```
## Lessons component
This component shows lists of lessons.

User can select lesson from the list or continue to the next page with pagination buttons. Every page contains maximum 10 lessons.
```javascript
<div className="lessons-container">
  {lessons.length === 0 ? <p>Loading</p> : this.renderLessonList(lessons, selectedLessonId, this.handleLessonClick)}
  {this.renderPagination(2)}
</div>
```

Pagination menu contains current page number and to links to the previous and to the next page of lessons.
```javascript
<div className="lesson-pagination">
  {currentPage > 0 ? (
    <NavLink className={'special-navlink'} to={`/lessons/${previousPage}`}>
    Previous
  </NavLink>    
  ) : <span className="grey-span">Previous</span>}
  <span className="current-page">{currentPage + 1}</span>
  {currentPage < totalPages - 1 ? (
    <NavLink className={'special-navlink'} to={`/lessons/${nextPage}`}>
      Next
    </NavLink>
  ) : <span className="grey-span">Next</span>}
</div>
```

Every row contains index, lesson title, author, number of likes.
```javascript
<div className="lesson-table-header">
    <div className="lesson-number element-header">N</div>
    <div className="lesson-title element-header element-header-title">Lesson title</div>
    <div className="lesson-author element-header">Author</div>
    <div className="lesson-likes element-header">Likes</div>
</div> 
{lessons.map((lesson, index) => (
    <div className="lesson-row" key={lesson._id}>
        <div className="lesson-number">{index + 1}</div>
        <NavLink
            to={`/lesson/${lesson.title}`}
            className={`special-navlink lesson-title ${selectedLessonId === lesson._id ? 'selected' : ''}`}
            onClick={() => handleLessonClick(lesson._id)}
        >
            {lesson.title}
        </NavLink>
        <div className="lesson-author">{lesson.user}</div>
        <div className="lesson-likes">{lesson.likes}</div>
      </div>
))}
```

Lessons are fetched with LessonServices component
```javascript
loadLessons(page) {
  LessonService.getAll(page)
    .then((res) => {
      if (res && Array.isArray(res)) {
        this.setState({
          lessons: res,
        });
      } else {
        displayError('No response from server')
      }
    })
    .catch((error) => console.log(error));
}
```

## Search bar component
This component performs search with keyword and category

User can search by keyword, category or both
```javascript
<input
    type="text"
    placeholder="Search for lessons..."
    value={this.state.keyword}
    onChange={this.onInputChangeHandler}
/>
<select value={this.state.category} onChange={this.onCategoryChangeHandler} className='searchbar-select'>
    <option value="all">All Categories</option>
    <option value="lessons">Lessons</option>
    <option value="electric-components">Electric Components</option>
    <option value="microcontrollers">Microcontrollers</option>
</select>
<button onClick={this.handleSearch.bind(this)}>Search</button>
```

The search is performed with LessonServices component
```javascript
handleSearch = (e) => {
  e.preventDefault();
  search(this.state.category, this.state.keyword)
    .then(res => {
      if (res && res.lessons) {
          this.props.onSearchResults(res.lessons);
      } else {
          displayError("No response from server")
      }
    })
    .catch(displayError("Server error while searching"))
};
```

## Notify component
This component shows notifications to the user.

Show successes, errors, infos and warnings in the website
```javascript
export const displaySuccess = (text) => {
    toast.success(text);
};
export const displayError = (text) => {
    toast.error(text);
};
export const displayInfo = (text) => {
    toast.info(text);
};
export const displayWarning = (text) => {
    toast.warning(text);
};
```

## Sign In component
Sign in component logs in users

Sign in request is performed with LessonServices component
```javascript
const handleSign = (event) => {
  event.preventDefault();
  signIn(state.username, state.password, setUsername)
    .then((data) => {
      if (data.token && data.username) {
        setUsername(data.username);
      } else {
        displayError("Status error")
      }
    })
    .catch((error) => console.log(error));
};
```

Reuse of Form component and button to log in
```javascript
<FormComponent
    username={state.username}
    password={state.password}
    handleInputChange={handleInputChange}
/>
<br></br>
<button type="submit" className="form-submit">
  Sign In
</button>
```

If user don't have an acount they can go to sing up page
```javascript
<div className="signin-link">
  <p>
    Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
  </p>
</div>
```

## Sign up component
This component creates user accounts.

After client side validations are made, the form is send to LessonServices which handles the request to the server.
```javascript
handleSignUp = (event) => {
  event.preventDefault();
  if(!passwordPattern.test(this.state.password)){
    displayInfo("Weak password")
  }else {
    signUp(this.state.username, this.state.email, this.state.password)
      .then(res => {
        if(res.status === 201){
          displaySuccess("Account created")
        }else {
          displayError("No response from server")
        }
        })
        .catch((error) => console.log(error))
    }
};
```

Reuse of Form component and button to sign up
```javascript
<form className="signup-form" onSubmit={this.handleSignUp}>
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={this.state.email}
    onChange={this.handleInputChange}
    className='input-form'
    required
  />
  <FormComponent username={this.state.username}
    password={this.state.password}
    handleInputChange={this.handleInputChange}/>
  <br></br>
  <button type="submit" className='form-submit'>Sign Up</button>
</form>
```

If user have an acount they can go to sing in page
```javascript
<div className="signin-link">
  <p>Already have an account? <NavLink to="/signin">Sign In</NavLink></p>
</div>
```

## AuthContext component
This component keeps user's username in global context.

Sets user'username in global context
```javascript
const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
  const isAuthenticated = username !== 'Guest';

  return (
    <AuthContext.Provider value={{ username, setUsername, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
```

## LessonServices component
This component handles all request to the server.

gets specific lesson
```javascript
return fetch(`${url}lesson/${title}`)
  .then(res => res.json()) 
  .then((data) => {
    return data;
  })
  .catch((error) => console.log(error));
```

gets all lessons
```javascript
return fetch(`${url}lessons/${pageNum}`)
  .then(res => res.json()) 
  .then((data) => {
      return data;
  })
  .catch((error) => console.log(error));
```

gets all lessons created by the user. If user is not logged in, a notification is shown
```javascript
const token = localStorage.getItem('token');
  if(!token) {
    displayInfo("You need to login first")
    return;
  }
  return fetch(`${url}edit`, {headers: {'Authorization': token}})
    .then(res => res.json()) 
    .then((data) => {
        return data;
    })
    .catch((error) => console.log(error));
```

Creates accounts
```javascript
let user = {
  username,
  email,
  password,
};

return fetch(`${url}signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user)
});
```

Other functions work in similar way