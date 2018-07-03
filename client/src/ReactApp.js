import React from 'react';
import $ from 'jquery';
import { ToastMessage } from "react-toastr" //include dependencies npm i react-toastr


export class MyClock extends React.Component{
      constructor(props){
		  super(props);
		  this.state={
			  date:new Date()
		  }
	  }	
	   
	   render(){
		  return(
		   <div><strong id="country">India</strong><br></br>
		   <strong>{this.state.date.toDateString()}</strong><br></br>
		   <strong>{this.state.date.toLocaleTimeString()}</strong>
		   </div>
		   );
	   }
	   
	   componentDidMount(){
		   this.timerId = setInterval(
		   ()=>this.tick(),
		   1000
		   );
	   }
	   
	   componentWillUnMount(){
		   clearInterval(this.timerId);
	   }
	   
	   tick(){
		   this.setState({
			   date:new Date()
		   });
	   }

}

function LineBreak(props){
	var check=props.line;
	if(check.length > 8){
		var line1 = check.substr(0,8);
		var line2 = check.substr(8,7);
		return(<div>{line1}<br></br>{line2}</div>);
	}else{
		return check;
	}
}

class Topics extends React.Component{
	constructor(props){
			super(props);
			this.state={
				display:true
			};
			this.handleDelete=this.handleDelete.bind(this);
	}
	
	handleDelete(){
		var confdelete = window.confirm('Are you sure want to delete ?');
		if(confdelete)
		{
        var self=this;
		$.ajax({
             url:"http://localhost:5000/topic/api/"+self.props.topic.id,
             type:"DELETE",
              success:function(result){
				//console.log(url);
				self.setState({display:false});
				window.location.reload();
			  },
			  error:function(xhr,ajaxOptions,thrownError){
				ToastMessage.error(xhr.responseJSON.message);
				}
			});
  		console.log(this.props.topic.id);
		}
    }

  render() {
    if(this.state.display===false)
    return null;
    else{
		 var opt = document.createElement('option');
		 opt.innerHTML=this.props.topic.id;
		 $('select').append(opt);
    return (<tr>
        <td>{this.props.topic.id}</td>
        <td><LineBreak line={this.props.topic.name}/></td>
        <td><LineBreak line={this.props.topic.description}/></td>
		<td><button className="btn btn-info" onClick={this.handleDelete}>Delete</button></td>
      </tr>);
	}
  }
}

export function TopicTable(props){
			var rows=[];
			props.topics.forEach(function(topic){
				rows.push(<Topics topic={topic} />)
			});
			if(rows.length > 0)
			return(
			<div>
			<table>
				<thead>
				<tr><th>ID</th><th>Name</th><th>Description</th><th>Delete</th></tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
			</div>
			);
			else
				return null;
}
	
	
export class SubmitDetails extends React.Component{
	
		constructor(props){
			super(props);
			this.handleSubmit=this.handleSubmit.bind(this);
			this.handleChange=this.handleChange.bind(this);
			this.handleUpdate=this.handleUpdate.bind(this);
			this.inputChange=this.inputChange.bind(this);
		}
		
		inputChange(event){
			var invalue=event.target.value;
			var regular = new RegExp("^(?!$)(?:[a-zA-Z0-9]*[a-zA-Z0-9]*)?$");
			if (!regular.test(invalue)) 
			{ 
				$('#Msg').html('<strong>Only alphanumeric and no spaces is allowed</strong>');
				$('#Msg').fadeIn(1000); 
				$('#Msg').fadeOut(1000); 
			}
		}
		
		handleSubmit(event){
			var regularexp = new RegExp("^(?!$)(?:[a-zA-Z0-9]*[a-zA-Z0-9]*)?$");
			var id = $('#idT').val(); var name=$('#idN').val();
			if(id!=='' && name!==''){
			if(regularexp.test(id) && regularexp.test(name))
			{
					var formsub = window.confirm('Do you want to submit the details ?');
					
					if(formsub){ //start confirm window
					var formData ={
						"id":$('#idT').val(),
						"name":$('#idN').val(),
						"description":$('#idD').val()
					};
					
					var jsonString=JSON.stringify(formData);
					$.ajax({
						 url:"http://localhost:5000/topic/add",
						 type:'POST',
						 contentType:'application/json',
						 data:jsonString,
						 success:function(){
							 $("[type='text']").val('');
							 alert('Data Submitted successfully.');
							window.location.reload();
						 },
						 error:function(xhr,ajaxOptions,thrownError){
							//ToastMessage.error(xhr.responseJSON.message);
							alert(ajaxOptions);
						}
						
						});
						} //End confirm window
			}
			else{
				alert('Only alphanumeric and no spaces are allowed');
			}
					
			}
			else{
				alert('Please fill all the required fields');
			}
			
		}
		
		handleChange(event){
			$('#checkId').hide();
			console.log($('h5').text());
			var ids = event.target.value;
			if(ids!=='--Select--')
			{
			$('#idT').val(ids);
			$('#idT').prop('disabled',true);
			fetch('http://localhost:5000/api/'+ids)
			.then(response=>response.json())
			.then(({data})=>{
					$('#idN').val(data.recordset[0].name);
					$('#idD').val(data.recordset[0].description);
					$("#sub").hide(500);
					$("#upd").show(500);
					$('h5').html('<strong><u>Update topic details:</u></strong>');
			}).catch(err=>console.error(err));
			}else{
				console.log(ids);
				$('#idN').val(null);
				$('#idD').val(null);
				$('#idT').prop('disabled',false);
				$('#idT').val(null);
				$("#sub").prop('disabled',false);
				$("#sub").show(500);
				$("#upd").hide(500);
				$('h5').html('<strong><u>Add topic details:</u></strong>');
			}
		}
		
		handleUpdate(){
			var regexpupd = new RegExp("^(?!$)(?:[a-zA-Z0-9]*[a-zA-Z0-9]*)?$");
			var nameupd=$('#idN').val();
			if(nameupd!==''){
				if(regexpupd.test(nameupd))
				{
			    if($('#idT').prop('disabled')===true)
				{
				var formupd = window.confirm('Do you want to update the details ?');
				if(formupd){
				var jsond = {
					"name":$('#idN').val(),
					"description":$('#idD').val()
				};
				var finjson = JSON.stringify(jsond);
				
				$.ajax({
					 url:'http://localhost:5000/topic/update/'+$('#idT').val(),
					 type:'PUT',
					 contentType:'application/json',
					 data:finjson,
					 success:function(){
						 alert('Data Updated Successfully.');
						 window.location.reload();
					 },
					 error:function(xhr,ajaxOptions,thrownError){
						ToastMessage.error(xhr.responseJSON.message);
						}
				});
				}
				}else{
					alert('Select Id from dropdown to update');
				}
				}else{
					alert('Only alphanumeric and no space is allowed.');
				}
			}else{
				alert('Please fill the required field');
			}
		}
		
		render(){
			return(
			<div>
			<label id="lselec" className="LeftApp"><strong className="txtwhit">Select Id to update:</strong>&nbsp;
				<select onChange={this.handleChange}>
				<option >--Select--</option>
				</select>
			</label>
			<br></br>
			<div id="form">
					<div><h5><strong><u>Add Topic Details:</u></strong></h5></div>
					<div id="Msg"></div>
					<div>
					<label htmlFor="idT">TopicId:&nbsp;<abbr>*</abbr>&nbsp;
					<input id="idT" name="nT" type="text" onChange={this.inputChange}/>
					</label>
					</div>
					<div id="checkId"></div>
					<div>
					<label htmlFor="idN">Name:&nbsp;<abbr>*</abbr>&nbsp;
					<input id="idN" name="nN" type="text" onChange={this.inputChange}/>
					</label>
					</div>
					<div>
					<label htmlFor="idD">Description:&nbsp;
					<input id="idD" name="nD" type="text"/>
					</label>
					</div>
					<div className="button">
					<button  id="sub" onClick={this.handleSubmit}><strong>Submit</strong></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button  id="upd" onClick={this.handleUpdate}>Update</button>
					</div>
				</div>
			</div>
			
			);
		}
}