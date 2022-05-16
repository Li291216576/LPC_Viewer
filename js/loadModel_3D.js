var obvApi;

async function loadModel_3D(fileName_3D,length) 
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

    const builder = new OBV.Api.ObvBuilder();
    const application = await builder.buildApplication(applicationOptions);
    obvApi = await builder.buildViewer3d(application, document.getElementById('viewer_3D'),viewer3dConfig);

    console.log(fileName_3D);

    let urn = new Array();
    const obvDocument = new Array();
    const viewer3dItems = new Array();
    
    for(var i=0;i<length;i++){
        urn[i] = 'urn:bimbox.object:Testing_Bucket_byTim_First/'+fileName_3D[i];
        obvDocument[i] =  await builder.loadDocument(application, urn[i]);
    }
    for(var i=0;i<length;i++){
        viewer3dItems[i] = obvDocument[i].get3dGeometryItems();
        console.log("viewer3dItems[i]:");
        console.log(viewer3dItems[i]);
        builder.load3dModels(obvApi, {
            obvDocument: obvDocument[i],
            viewer3dItem: viewer3dItems[i][0],
            modelOffset: { x: 0, y: 0, z: 0 },
            rotation: 30 * Math.PI / 180,
        });
    }

    
    markUp();
}