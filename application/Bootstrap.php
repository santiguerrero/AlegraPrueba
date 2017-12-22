<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
  protected function _initDoctype()
  {
    $this->bootstrap('view');
    $view = $this->getResource('view');
    $view->doctype('XHTML1_STRICT');
    
  }

}
/*array()
{
$this -> bootstrap ('frontController'); 
$front = $this-> getResource ('frontController'); 
$front-> setParam ('prefixDefaultModule', 1);
}*/