import {Component} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {UploadService} from './file-upload.service';


const URL = '/api';


@Component({
	selector: 'uploadFile',
	styleUrls: ['./file-upload.component.css'],
	templateUrl: './file-upload.component.html',
	providers: [UploadService]
})
export class FileUploadComponent {
	constructor(private service:UploadService) { }
	
	onChange(event) {
		console.log('onChange');
		var files = event.srcElement.files;
		console.log(files);
		this.service.makeFileRequest('http://localhost:8182/upload', [], files).subscribe(() => {
			console.log('sent');
		});
	}
}
