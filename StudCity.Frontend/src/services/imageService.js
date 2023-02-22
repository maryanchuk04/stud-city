import axios from "axios";

export class ImageService {
	constructor() {
		this.URL = "https://api.imgbb.com/1/upload";
	}

	async uploadImage(image) {
		const imageFetch = await fetch(image);
		const blob = await imageFetch.blob();
		const body = new FormData()
		body.set('key', 'a8933f7b26cdb54c9c89f74cf99f7224')
		body.append('image', new File([blob], "image", { type: 'image/png' }))
		
		try{
			const response = await axios({
				method: 'post',
				url: 'https://api.imgbb.com/1/upload',
				data: body
			});
			
			return response.data.data.url;
		}catch(error) {
			alert("Something went wrong");
		}
	
	}
}