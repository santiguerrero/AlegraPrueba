let sm = Ext.create('Ext.selection.CheckboxModel');
// let theGrid;
Ext.define('Alegra.view.contact.Grid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.contactGrid',
  requires: ['Ext.toolbar.Paging'],
  iconCls: 'icon-user',
  title: 'Contactos Alegra Web',
  selModel: sm,
  store: 'Contacts',
  stripeRows: true,
  columnLines: true,
  id: 'contactGrid',
  columns: [{
    header: 'Nombre',
    width: 299,
    flex: 1,
    dataIndex: 'name',
    align: 'center',
    menuDisabled: true,
  }, {
    header: 'Identificación',
    width: 177,
    flex: 1,
    dataIndex: 'identification',
    align: 'center',
    menuDisabled: true,
  }, {
    header: 'Teléfono 1',
    width: 177,
    flex: 1,
    dataIndex: 'phonePrimary',
    align: 'center',
    menuDisabled: true,
  }, {
    header: 'Observaciones',
    width: 177,
    flex: 1,
    dataIndex: 'observations',
    align: 'center',
    menuDisabled: true,
  }, {
    xtype: 'actioncolumn',
    width: 50,
    text: 'Acciones',
    align: 'center',
    flex: 1,
    menuDisabled: true,
    items: [
      {
        icon   : 'https://cdn1.alegra.com/images/icons/zoom.png',
        tooltip: 'Visualizar',
        handler: function(grid, rowIndex, colIndex, item, e, record, row) {
          // this.fireEvent('itemClick', grid, rowIndex, colIndex, item, e, record, row, 'show');
          var rec = grid.getStore().getAt(rowIndex);
          let formShow = Ext.create('Alegra.view.contact.Show').show();
          formShow.down('form').loadRecord(rec);
        },
      }, {
        icon   : 'https://cdn1.alegra.com/images/icons/page_edit.png',
        tooltip: 'Editar',
        handler: function(grid, rowIndex, colIndex) {
          var rec = grid.getStore().getAt(rowIndex);
          let formEdit = Ext.create('Alegra.view.contact.Form').show();
          // Si se edita un record.
          if (rec.stores != null) {
            formEdit.down('form').loadRecord(rec);
          }
        },
      }, {
        icon   : 'https://cdn1.alegra.com/images/icons/delete.png',
        tooltip: 'Eliminar',
        handler: function(grid, rowIndex, colIndex) {
          let rec = grid.getStore().getAt(rowIndex);
          let store = grid.getStore();
      		Ext.Msg.show({
      			title: 'Eliminar cliente',
      			msg: '¿Estás seguro de que deseas eliminar el cliente? Esta operación no se puede deshacer',
      			buttons: Ext.Msg.YESNOCANCEL,
      			icon: Ext.MessageBox.QUESTION,
    				scope: this,
      			width: 600,
      			fn: function(btn) {
      				if (btn == 'yes') {
                let myMask = new Ext.LoadMask(Ext.getBody(), { msg:"Por favor, espere..." });
    						myMask.show();
      					store.remove(rec);
      					store.sync({
      						success: function (batch, action) {
      							myMask.hide();
      							// Cargar de nuevo el store.
      							store.load();
      							let reader = batch.proxy.getReader();
      							Ext.Msg.alert('Success', reader.jsonData.message );
      						},
      						failure: function (batch, action) {
      							myMask.hide();
      							let reader = batch.proxy.getReader();
      							Ext.Msg.alert('Failed', reader.jsonData ? reader.jsonData.message : 'No response');
      						},
    							scope: this,
      					});
      				}
      			}
      		});
        },
      },
    ],
  }],
  initComponent: function() {
    // theGrid = this;
    this.dockedItems = [{
      xtype: 'toolbar',
      padding: '5 5 5 5',
      maring: '2',
      items: [
      {
        iconCls: 'icon-save',
        text: 'Agregar',
        action: 'add',
        padding: '5 5 5 5',
        margin: '1',
      }, {
        iconCls: 'icon-delete',
        text: 'Eliminar',
        action: 'delete',
        padding: '5 5 5 5',
        margin: '1',
      }],
    }, {
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      store: 'Contacts',
      displayInfo: true,
      displayMsg: 'Mostrando Contactos {0} - {1} de {2}',
      emptyMsg: "Ning\u00FAn contacto encontrado.",
    }];
    this.callParent(arguments);
  }
});
