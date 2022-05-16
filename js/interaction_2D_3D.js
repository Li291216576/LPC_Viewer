var linkageAddin, linkageAddinId, application;
    const listenEvents = (obvApi) => {
    // 获取插件
        linkageAddinId = 'OBVAddins.Linkage';
        const addinManager = obvApi.getAddinManager();
        linkageAddin = addinManager.getAddin(linkageAddinId);
        if (linkageAddin) {

            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.LinkageReady, () => {
            console.log('数据已经就绪，可以开始联动了');
            });
            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.ComponentNotFound, () => {
            console.log('3维构件没有找到');
            });
            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.EntityNotFound, () => {
            console.log('2维构件没有找到');
            });
            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.ComponentFound, (e) => {
            console.log(e);
            });
            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.EntityFound, (e) => {
            console.log(e);
            });
            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.LinkageSelectedDrawing, (e) => {
            console.log('选择了图纸');
            });
            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.LinkageExit, (e) => {
            console.log('退出本次图纸联动');
            });
            linkageAddin.addEventListener(OBVAddins.Linkage.LinkageEventTypes.OpenDrawingError, (e) => {
            console.log('打开图纸时出现错误');
            });
        }
    };

async function interaction_2D3D(fileName_2D3D) {
    // 创建2d视图窗口
    const viewer2dContainer = document.getElementById('interaction_2D');


    const applicationOptions = {
        getAccessToken: AuthHelper.getAccessToken,
        refreshAccessToken: AuthHelper.getAccessToken,
        serviceConfig: {
            origin: 'https://api.cloud.pkpm.cn',
            apiContextPath: '/bimserver/viewing/v3',
        },
    };

    // 加载模型
    let urn = 'urn:bimbox.object:Testing_Bucket_byTim_First/'+fileName_2D3D;
    //let urn = 'urn:bimbox.object:Testing_Bucket_byTim_First/Architecture.0001_pmodel';
    /*fileName=window.location.href.split("=")[1];
    fileName=fileName.split("&")[0];
    urn = urn+fileName;*/


    const builder = new OBV.Api.ObvBuilder();
    const application = await builder.buildApplication(applicationOptions);
    const obvDocument = await builder.loadDocument(application, urn);



    const obvApi = await builder.buildViewer3d(application, document.getElementById('interaction_3D'), {
        addinConfigs: [
            {
                id: 'OBVAddins.Linkage',
                noButton: false,
                viewer2dContainer,
                application: application,
            },
        ],
    });

    const viewer3dItems = obvDocument.get3dGeometryItems();
    builder.load3dModels(obvApi, {
        obvDocument: obvDocument,
        viewer3dItem: viewer3dItems[0],
    });
    listenEvents(obvApi);
}