let pro = document.querySelector('#pro');
let img = document.querySelector('#image');

class DOM{
	static getById(id){
		return document.getElementById(id);
	}
	static getClasses(className){
		return document.getElementsByClassName(className);
	}
	static getClass(className){
		return document.querySelector('.' + className);
	}
	static getTagNames(tagName){
		return document.getElementsByTagName(tagName);
	}
	static getTagName(tagName){
		return document.querySelector(tagName);
	}
}

class Helper{
	static sort(url1,url2){
		if (Number(url1.quality) > Number(url2.quality)) return -1;
		if (Number(url1.quality) == Number(url2.quality)) return 0;
		if (Number(url1.quality) < Number(url2.quality)) return 1;
	}
}



	let sendBtn = DOM.getById ('btn');
	sendBtn.onclick = () => {
		console.log("ok");
		event.preventDefault();
		let input = DOM.getById('inp'),
			form = DOM.getTagName('form'),
			URL = input.value.toLowerCase().trim(),
			errorField = DOM.getClass('errorField');
			errorP =DOM.getClass ('errorP')
		    
			
		
		
		if (!URL) {
			errorField.style.display = 'block';
			
			
			
		
			return;
		}
		// if (!URL.includes('instagram.com') && !URL.includes('instagram.com/reel') && !URL.includes('youtube.com')&& !URL.includes('facebook.com')&& !URL.includes('tiktok')) { 
		// 	errorField.style.display = 'block';
		// 	errorP.innerText = "Iltimos Faqat Youtubeda Instagram Facebook TikTokdan  Link Kiriting...";
		// 	sendBtn.innerHTML = 'Send';
		// 	input.value = '';
		// 	sendBtn.removeAttribute('disabled');
        //     pro.innerHTML = ``;
		// 	// loader remove...
		// 	return;
		// }
		fetch('https://api.onlinevideoconverter.pro/api/convert',{
			method: 'POST',
			body: new FormData(form)
		})
		.then((response)=> response.json())
		.then((result)=>{
			console.log ("ok")
			console.log(result.thumb)
			// console.log(item.url)
			let urls = result.url;
			urls.sort(Helper.sort)
			console.log(urls);    
			sendBtn.innerHTML = 'Send';
			sendBtn.removeAttribute('disabled');
			errorField.style.display = 'none';
       
			
		
            urls.forEach(function(item){
				let media,
					con = true;
				if (item.audio) {
					media = `<img class="img-fluid" src="../img/audio.gif" alt="" style="width: 277px"> <br><br>
					<audio src="${item.url}" controls></audio>`
				}else{
					if (item.no_audio) {
						con = false;
					}
					media = `<video controls poster="${result.thumb}">
								<source src="${item.url}" type="video/${item.type}">
							</video>`
				}
				if(con) { //item.no_audio == false && item.audio == false
						pro.innerHTML += `
							<div class="col-md-4">
								<div class="card text-center  shadow-lg p-3 mb-5 bg-warning rounded" style="">
									<div class="card-header">
										<!-- <a href="${item.url}" target="blank">-->
											<!-- <img class="img-fluid" src="${result.thumb}" alt=""> -->
										<!-- <video src="${item.url}" controls style="width: 100%;" poster="${result.thumb}"></video>
										</a> -->
										${media}
									</div>
									<div class="card-body">
										<b><span class="">${item.quality}px</span></b><br><br>
										<span class="title">${result.meta.title}</span><br><br>
										<a href="${item.url}" download target="blank" class="btn btn-danger">
											<span>Yuklab olish</span>
										</a>
									</div>
									<div class="card-footer text-muted">
										${result.meta.duration}
									</div>
								</div>  
							</div>
						`; 
					}
			}); 
			sendBtn.removeAttribute('disabled');
		});
	}
