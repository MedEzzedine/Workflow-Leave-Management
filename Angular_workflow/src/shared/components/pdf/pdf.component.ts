import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import { BehaviorSubject, Subject } from 'rxjs';
import { demandeModel } from 'shared/models/demandeModel';
import { myoastrService } from 'shared/service/toastr/mytoastr.service';
import { UploadService } from 'shared/service/upload-service/upload.service';
 enum signature{
  add,
  edit,
  delete,
  save
 
 }
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})

export class PdfComponent implements OnInit {
  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: WebViewerInstance;
  @Output() coreControlsEvent:EventEmitter<string> = new EventEmitter(); 
  @Output() close:EventEmitter<boolean> = new EventEmitter(); 
  @Input() demande :demandeModel
  save=false
  ok=1
  show_Loader:boolean=false
  private _t$signature = new BehaviorSubject<signature>(signature.add);
  signature = this._t$signature.asObservable();
  private documentLoaded$: Subject<void>;
  constructor(private element : ElementRef,private upload:UploadService,private toastr:myoastrService,private router :Router, private ngZone:NgZone) { 
    this.documentLoaded$ = new Subject<void>();
  }
 

  ngOnInit(): void {
 
  }
  valid(){
    
    if(!this.save){
      this.toastr.showNotification("top","right",4,"sign","pdf",".......")
    }else{
  
      this._t$signature.next(signature.save)
    }
 

  }
  ngAfterViewInit(): void {

    WebViewer({
      path: '../../../../lib',
      initialDoc: '../../../../files/pdf.pdf',
      
      fullAPI: true,
      disabledElements: [
        'ribbons',
        'toggleNotesButton',
        'searchButton',
        'menuButton',
        'rubberStampToolGroupButton',
        'stampToolGroupButton',
        'fileAttachmentToolGroupButton',
        'calloutToolGroupButton',
        'undo',
        'redo',
        'eraserToolButton'
      ],
    }, this.viewer.nativeElement).then(async instance => {
    
      //instance.UI.contextMenuPopup

      const { documentViewer, Annotations, annotationManager,Math } = instance.Core;
   

    



      // const { WidgetFlags } = Annotations;
      // const flags = new WidgetFlags({});
      // flags.set('Required', true);
      // const tex = new Annotations.Forms.Field("some text field name", {
      //   type: 'Tx',
      // });
      documentViewer.addEventListener('documentLoaded',async () => {
   
  
      const text = await new Annotations.FreeTextAnnotation()
     
      text.PageNumber = 1;
      text.X = 450;
      text.Y = 150;
      text.Width = 100;
      text.Height = 50;
      
      //const m =new Math.Rect(1,10,10,10)
      //m.translate(200, 200)
      //text.setRect(m)
      console.log(text.getRect())
      text.FontSize ='15px'
      text.Font="sherif"
      text.TextColor=new Annotations.Color(0, 0, 0),
      console.log(this.demande)
      text.setContents(this.demande.owner.nom +"  "+this.demande.owner.prenom +"\n"
      +this.demande.owner.adresse)
      
      text.setPadding(new Math.Rect(5000, 5000, 5000, 5000));
      text.setIntent("e_FreeTextTypeWriter")
      
      annotationManager.addAnnotation(text, { autoFocus: false });
      annotationManager.drawAnnotationsFromList(text);
     

      const content = await new Annotations.FreeTextAnnotation()
    
      content.PageNumber = 1;
      content.X = 60;
      content.Y = 250;
      content.Width = 100;
      content.Height = 50;
      //content.setRect(new Math.Rect(100,100,100,100))
      content.setPadding(new Math.Rect(6000, 6000, 6000, 6000));
      content.FontSize ='13px'
      
      content.TextColor=new Annotations.Color(0, 0, 0),
      content.setContents("Le : "+ this.demande.date.toString())
      content.setIntent("e_FreeTextCallout")
      annotationManager.addAnnotation(content, { autoFocus: false });
      annotationManager.drawAnnotationsFromList(content);









      const body = await  new Annotations.FreeTextAnnotation()
    
      body.PageNumber = 1;
      body.X = 60;
      body.Y = 420  ;
      body.Width = 500;
      body.Height = 100;
      //content.setRect(new Math.Rect(100,100,100,100))
      body.setPadding(new Math.Rect(7000, 7000,7000,7000));
      body.FontSize ='13px'
      //body.Font="sherif"
      body.TextColor=new Annotations.Color(0, 0, 0),
      body.setContents("Madame / Monsieur, Par la présente, je vous prie de bien vouloir m'accorder "+ this.demande.duree+ " jours de congé pour la période du "+ this.demande.dateDebut+ "  au "+ this.demande.dateFin+ " . Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.")
      body.setIntent("e_FreeTextCallout")
      annotationManager.addAnnotation(body, { autoFocus: false });
      annotationManager.drawAnnotationsFromList(body);
      
     //instance.UI.loadDocument("", { filename: 'myfile.pdf' });



this.signature.subscribe(async x=>{
  if(x==signature.save){
    
    var doc = documentViewer.getDocument();
     var xfdfString = await annotationManager.exportAnnotations();
     const data = await doc.getFileData({
       // saves the document with annotations in it
       xfdfString,
       
     });
     const arr = await new Uint8Array(data);
     const blob = await new Blob([arr], { type: 'application/pdf' });
     const file = new File([blob], 'pdf.pdf');
     const formData = new FormData();
     formData.append('files',file);
     formData.append('iddemande',this.demande.id.toString());
     this.upload.uploadfile(formData).subscribe(x=>console.log(x),e=>console.log(e),
     ()=>{
       
     
     this.toastr.showNotification("top","right",2,"success ","",".......")
     this.close.emit()

     })
 
  }

  
})

  

      })




      documentViewer.addEventListener('annotationsLoaded', (e,action) => {
      annotationManager.getAnnotationsList().forEach(annot => {
         
          annot.ReadOnly = true;
          annot.NoMove=true
       
      
        });
      }); 



 
            
           await annotationManager.addEventListener('annotationChanged',async (e,action)=>{
           
         
            if( e[0].Subject=='Signature'){
              const a=await action
              if (action === 'add') {
                this.save=true
                e[0].NoMove=true
                e[0].NoResize=true
                e[0].rotate=false
              } else if (action === 'modify') {
              //** */  console.log('this change modified annotations');
              } else if ( action === 'delete') {
                this.save=false
               
              }
}
            })

      const field = new Annotations.Forms.Field("some signature field name", { 
        type: 'signature', 
      
      });
    
      const widgetAnnot = new Annotations.SignatureWidgetAnnotation(field, {
        appearance: '_DEFAULT',
        appearances: {
          _DEFAULT: {
            Normal: {
              data:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC',
              
                offset: {
                x: 100,
                y: 100,
              },
            },
          },
        },
      });
  
      // set position and size
      widgetAnnot.PageNumber = this.ok;
      widgetAnnot.X = 370;
      widgetAnnot.Y = 620;
      widgetAnnot.Width = 100;
      widgetAnnot.Height = 40;
     
      //add the form field and widget annotation
      annotationManager.getFieldManager().addField(field);
      annotationManager.addAnnotation(widgetAnnot);
      annotationManager.drawAnnotationsFromList([widgetAnnot]);
    });
    }


    getDocumentLoadedObservable() {
      return this.documentLoaded$.asObservable();
      
    }


    cancel(){
      this.close.emit()
    }
   
}
