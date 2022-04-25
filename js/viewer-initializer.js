class ViewerInitializer {
    /**************************实例化Builder的函数************************/
    constructor() {
        this.builder = new OBV.Api.ObvBuilder();
    }


    /*****创建application的函数（一个application可以理解为一个应用），环境中可以同时存在多个application不受影响*****/
    async buildApplication(applicationOptions) {
        this.application =  await this.builder.buildApplication(applicationOptions);
        return this.application;
    }

    /**************************创建ObvDocument管理视图***************************/
    /***********需要再OBV中显示的模型文件（这个模型的文件资源包含在URN中）***********/
    /*调用完这个函数之后，可以拿到OBV对外暴露的API对象，此时可以对OBV进行部分设置和操作*/
    async loadDocumentList(documentUrnList) {
        this.documentList = [];
        for (const urnItem of documentUrnList) {
            const documentFile = await this.builder.loadDocument(this.application, urnItem.documentUrn);
            this.documentList.push({ obvDocument: documentFile, guid: urnItem.guid, offset: urnItem.offset });
        }
        return this.documentList;
    }//

    /**********************创建3d model的Viewer容器**********************/
    async load3dModel(viewerContainer,viewer3dConfig){
        const v3dModelList = [];
        for (const item of this.documentList) {
            if (item.obvDocument) {
                const v3dItems = item.obvDocument.getViewer3dItem(item.guid);
                v3dItems &&
                v3dModelList.push({
                    obvDocument: item.obvDocument,
                    viewer3dItem: v3dItems,
                    modelOffset: item.offset,
                });
            }
        }
        const viewer3dApi = await this.builder.buildViewer3d(this.application, viewerContainer, viewer3dConfig);
        for (const item of v3dModelList) {
            this.builder.load3dModels(viewer3dApi, item);
        }
        return viewer3dApi;
    }

    async loadDocModel({applicationOptions, viewerContainer, pdfDocumentUrn, viewerDocConfig}){
        try {
            const application = await this.builder.buildApplication(applicationOptions);
            const obvDocument = await this.builder.loadDocument(application, pdfDocumentUrn);
            const obvApi = await this.builder.buildViewerDoc(application, viewerContainer, viewerDocConfig);
            const viewerDocItem = obvDocument.getViewerDocItem();
            if (!viewerDocItem) {
                throw new Error('vdoc' + '视图 不存在');
            }
            this.builder.loadDocModels(obvApi, obvDocument, viewerDocItem);
            return { obvApi, application };
        } catch (e) {
            throw new Error('initializeViewerDoc error' + e);
        }
    }

    async load2dModel({ applicationOptions, viewerContainer, documentUrn, viewer2dConfig }) {
        try {
            const application = await this.builder.buildApplication(applicationOptions);
            const obvDocument = await this.builder.loadDocument(application, documentUrn);
            const viewer2dApi = await this.builder.buildViewer2d(application, viewerContainer, viewer2dConfig);
            const viewer2dItem = obvDocument.get2dGeometryItems();
            console.log(viewer2dItem);
            if (!viewer2dItem) {
                throw new Error('v2d' + '视图 不存在');
            }
            this.builder.load2dModels(viewer2dApi, {
                obvDocument,
                viewer2dItem: viewer2dItem[0],
            });
            return { viewer2dApi, application };
        } catch (e) {
            throw new Error('initializeViewerDoc error' + e);
        }
    }
}
