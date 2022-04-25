async function loadModel_2D(fileName_2D)  {
    
    const applicationOptions = {
       
        getAccessToken: AuthHelper.getAccessToken,
        refreshAccessToken: AuthHelper.getAccessToken,
        serviceConfig: {
            origin: 'https://api.cloud.pkpm.cn',
            apiContextPath: '/bimserver/viewing/v3',
        },
    };



    let urn = 'urn:bimbox.object:Testing_Bucket_byTim_First/'+fileName_2D;
    const builder = new OBV.Api.ObvBuilder();
    const application = await builder.buildApplication(applicationOptions);
    const obvDocument = await builder.loadDocument(application, urn);
    const obvApi = await builder.buildViewer2d(application, document.getElementById('viewer_2D'));
    const viewer2dItems = obvDocument.get2dGeometryItems();
    builder.load2dModels(obvApi, {
        obvDocument: obvDocument,
        viewer2dItem: viewer2dItems[0],
    });


}