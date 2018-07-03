import React, { Component } from 'react';
import logo from './logo.svg'; import office from './office.jpg'; import office1 from './office1.jpg';
import classroom from './classroom.jpg'; import node from './node.svg'; import sunrise from './sunrise.jpg';
import learning from './learning.jpg'; import abacus from './abacus.jpg'; import facebook from './facebook.svg';
import linkedin from './linkedin.png'; import twitter from './twitter.svg'; import license from './License.png';
import iropost from './poster.jpg';
import './App.css';
import $ from 'jquery'; //used 'npm install jquery' to include the dependencies.
import ironman from './iron-man_suite.mp4';

import { MyClock,SubmitDetails,TopicTable} from './ReactApp'

class App extends Component{
	
		constructor(props){
			super(props);
			this.state={
				topics:[]
			};
			this.loadTopicsFromServer=this.loadTopicsFromServer.bind(this);
		}
		
		loadTopicsFromServer(){
			fetch('http://localhost:5000')
			.then(response=>response.json())
			.then(({data})=>{
			this.setState({topics:data.recordset});
			}).catch(err=>console.error(err));
		}
		
     	componentDidMount(){
			this.loadTopicsFromServer();
		}
		
		render(){
			var tempTopic = this.state.topics;
			
			$(document).ready(function(){
				
				function CheckValidId(){
					
					var checkflag=0;
					for(var topicId of tempTopic){
						if(topicId.id===$('[name="nT"]').val())
							checkflag=1;
					}
					if(checkflag===0 && $('[name="nT"]').val()!=='')
					{
						$('#sub').slideDown();
						$('#checkId').html('<strong>Id can be used</strong>').css('color','green');$('#checkId').show();
					}
					if(checkflag===1 && $('[name="nT"]').val()!=='')
					{
						$('#sub').slideUp();
						$('#checkId').html('<strong>Id cannot be used</strong>').css('color','red');$('#checkId').show();
					}
					if($('[name="nT"]').val()==='') $('#checkId').hide();
				}
				
				$('[name="nT"]').attr('maxlength',4);
				$('[name="nN"]').attr('maxlength',15);
				$('[name="nD"]').attr('maxlength',15);
				
				$("#Main").click(function(){
				$('video').trigger('play');
				});
				
				$('[name="nT"]').keyup(function(e){
					CheckValidId();
					if(e.target.value.length===4){
						$('[name="nN"]').focus();
					}
				});
				
				$('[name="nN"]').keyup(function(e){
					if(e.target.value.length===15){
						$('[name="nD"]').focus();
					}
				});
			});
			return(
			<div>
			<header>			
					<h1 className="App-title"><strong>Welcome to React UI</strong></h1>
					<img id="logo" src={logo} className="App-logo" alt="logo" />
					<img id="office" width="300px" height="120px" src={office} alt="Office logo" />
					<img id="classroom" width="300px" height="120px" src={classroom} alt="Classroom logo" />
					<img id="office1" width="300px" height="120px" src={office1} alt="Second Office logo" />
					<div id="clock"><MyClock /></div>
					
			</header>
			<main>
			<div id="main" className="backImg">
			<div><SubmitDetails /></div>
			<div id="emptab"><TopicTable topics={this.state.topics}/></div>
				<div id="Main">
				<video width="390" height="390" poster={iropost}>
					<source src={ironman} type="video/mp4"/>
				</video>
				</div>
			</div>
			</main>
			<br></br>
			<footer>
			<div>
			<h1 className="App-title"><strong>Welcome to Node</strong></h1>
			<img id="spring" src={node} className="SApp-logo" alt="Node logo" />
			</div>
			<div id="imgM">
		<img id="sunrise" width="300px" height="125px" src={sunrise} alt="Sunrise logo" />
		<img id="learning" width="300px" height="125px" src={learning} alt="Learning logo" />
				<img id="abacus" width="300px" height="125px" src={abacus} alt="Abacus logo" />
			</div>
			<div className="colorP">
				<a href="https://www.facebook.com" title="Facebook" rel="noopener noreferrer" target="_blank"><img id="face" src={facebook} alt="facebook" /></a>
				<a href="https://www.linkedin.com" title="Linkedin" rel="noopener noreferrer" target="_blank"><img id="linkedin" src={linkedin} alt="linkedin" /></a>
				<a href="https://www.twitter.com" title="Twitter" rel="noopener noreferrer" target="_blank"><img id="twitter" src={twitter} alt="linkedin" /></a>
				<img id="license" src={license} alt="license" />
			</div>
			</footer>
			</div>
			);
		}
}

export default App;
