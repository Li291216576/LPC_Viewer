var obvApi;
async function loadModel_3D(fileName_3D) 
{
    
    let applicationOptions = {
        getAccessToken: AuthHelper.getAccessToken,
        refreshAccessToken: AuthHelper.getAccessToken,
        serviceConfig: {
            origin: 'https://api.cloud.pkpm.cn',
            apiContextPath: '/bimserver/viewing/v3',
        },
    };

    const viewer3dConfig ={
        addinConfigs:[
        {
            id: 'OBVAddins.Markup',
            noButton: false,
        },
        ],};


    let urn = 'urn:bimbox.object:Testing_Bucket_byTim_First/'+fileName_3D;
    const builder = new OBV.Api.ObvBuilder();
    const application = await builder.buildApplication(applicationOptions);
    const obvDocument = await builder.loadDocument(application, urn);
    obvApi = await builder.buildViewer3d(application, document.getElementById('viewer_3D'),viewer3dConfig);
    const viewer3dItems = obvDocument.get3dGeometryItems();
    builder.load3dModels(obvApi, {
        obvDocument: obvDocument,
        viewer3dItem: viewer3dItems[0],
    });
    
    markUp();
}