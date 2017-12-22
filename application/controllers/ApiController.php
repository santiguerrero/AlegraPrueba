<?php

//Class que comunica el ExtJS con el api de Alegra.com
 
class ApiController extends Zend_Controller_Action
{
  public function init()
  {
    //
  }

  /**
   * Metodo para listar los contactos Con GET
   * @method GET
   * @param  {int}     id
   * @param  {string}  type
   * @param  {string}  query
   * @param  {int}     start
   * @param  {int}     limit
   * @param  {string}  orderDirection
   * @param  {string}  orderField
   * @param  {boolean} metadata
   * @return {object}  Retorna object con la lista de
   * contactos o json con error
   */
  public function indexAction()
  {
    $this->getHelper('Layout')->disableLayout();
    $this->getHelper('ViewRenderer')->setNoRender();

    // Busqueda para cada uno
    if (null != ($id = $this->_request->getQuery('id'))) {
      $contacts = new Application_Model_ContactMapper();
      $data = $contacts->findById($id);

      $this->getResponse()->setHeader('Content-Type', 'application/json');
      return $this->_helper->json->sendJson($data);
    }

    $type = $this->_request->getQuery('type') ? $this->_request->getQuery('type') : '';
    $start = intval($this->_request->getQuery('start')) ? intval($this->_request->getQuery('start')) : 0;
    $limit = intval($this->_request->getQuery('limit')) ? intval($this->_request->getQuery('limit')) : 20;
    $page = intval($this->_request->getQuery('page'));

    $contacts = new Application_Model_ContactMapper();
    $data = $contacts->fetchAll($type, '', $start, $limit);

    $this->getResponse()->setHeader('Content-Type', 'application/json');
    return $this->_helper->json->sendJson($data);
  }

  /**
   * Metodo para crear un contacto Con POST
   * @param  {object} data contiene un object con toda la data del contacto
   * @return {object} Retorna object con la data del contacto creado o object con error
   */
  public function createAction()
  {
    $this->getHelper('Layout')->disableLayout();
    $this->getHelper('ViewRenderer')->setNoRender();

    $params = (array) json_decode($this->getRequest()->getPost('data'));
    unset($params['id']);

    $contact = new Application_Model_ContactMapper();
    $form = new Application_Model_Contact($params);
    $data = $contact->upsert($form);

    $this->getResponse()->setHeader('Content-Type', 'application/json');
    return $this->_helper->json->sendJson($data);
  }

  /**
   * Metodo para actualizar un contacto
   * @param  {object} data contiene un object con la data del contacto
   * @return {object} Retorna object con la data del contacto actualizado o object con error
   */
  public function updateAction()
  {
    $this->getHelper('Layout')->disableLayout();
    $this->getHelper('ViewRenderer')->setNoRender();

    $params = (array) json_decode($this->getRequest()->getPost('data'));

    $contact = new Application_Model_ContactMapper();
    $form = new Application_Model_Contact($params);
    $data = $contact->upsert($form);

    $this->getResponse()->setHeader('Content-Type', 'application/json');
    return $this->_helper->json->sendJson($data);
  }

  /**
   * Metodo para actualizar un contacto
   * @param  {object} data contiene un object con la data del contacto
   * @return {object} Retorna object con mensaje de confirmacion o object con error
   */
  public function deleteAction()
  {
    $this->getHelper('Layout')->disableLayout();
    $this->getHelper('ViewRenderer')->setNoRender();

    $param = json_decode($this->getRequest()->getPost('data'));

    $contact = new Application_Model_ContactMapper();
    if (count($param) > 1) {
      foreach ($param as $key => $value) {
        $data = $contact->delete($value->id);
      }
      $this->getResponse()->setHeader('Content-Type', 'application/json');
      if (isset($data['code']) && '200' == $data['code']) {
        return $this->_helper->json->sendJson([
          'code' => 200,
          'message' => 'Los contactos han sido eliminados exitosamente.',
        ]);
      }
    }
    $data = $contact->delete($param->id);

    $this->getResponse()->setHeader('Content-Type', 'application/json');
    return $this->_helper->json->sendJson($data);
  }
}
