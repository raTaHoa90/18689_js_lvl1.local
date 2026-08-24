// Document Object Model (DOM)
/*
    
    DOMLevel1:
        document.forms
        document.images
        document.writeln
        document.all

    DOMLevel2
        document.getElementsByClassName
        document.getElementsByName
        document.getElementById
    
    DOMLevel3
        XPath
        documet.querySelector
        documet.querySelectorAll
*/

/*
    .nodeType ==
        Node.ELEMENT_NODE                - обычный элемент узла
        Node.ATTRIBUTE_NODE              - узел атрибута
        Node.TEXT_NODE                   - текстовый узел
        Node.CDATA_SECTION_NODE          - специальный текстовый узел, который может содержать в себе спецсимволы разметки, которые не должны парситься как элементы разметки
        Node.PROCESSING_INSTRUCTION_NODE - Узлы для указания параметров парсинга документя (<?xml-stylesheet ... ?>)
        Node.COMMENT_NODE                - Узлы комментария
        Node.DOCUMENT_NODE               - Главный узел документа, корень иерархии дерева
        Node.DOCUMENT_TYPE_NODE          - Узел указывающий тип спецификации документа (<!DOCTYPE html>)
        Node.DOCUMENT_FRAGMENT_NODE      - Узел используется как корневой узел для временного размещения в памяти дерева узлов, например для копирования и вставки.
        Node.NOTATION_NODE               - Узел обозначение
*/

/*
    Node.
        .nodeName    - возвращает имя узла (наименование тега)
        .nodeType    - тип узла
        .nodeValue   - содержит текстовые данные для некоторых типов узлов, таких как TEXT_NODE, COMMENT_NODE и PROCESSING_INSTRUCTION_NODE
        .ownerDocument - возвраает Document в котором находится узел или null, если он еще не определен
        .parentNode  - возвращет узел родителя, или null, если узел является корневым
        .childNodes  - возвращает NodeList, всех дочерних узлов элемента
        .firstChild  - возвращает первый дочерний узел элемента или null
        .lastChild   - возвращает последний дочерний узел элемента или null
        .nextSibling - возвращает следующий узел в дереве или null
        .previousSibling - возвращает предыдущий узел или null
        .textContent - возвращает склеенный текст всех потомков без самих узлов.

        .appendChild(node)
            - вставляет узел как последний дочерний элемент
        .cloneNode(deep)
            - клонирует узел, если параметр deep = true, то рекурсивно клонируются и все потомки этого узла
        .contains(node)
            - проверяет, находится ли данный узел среди потомков данного элемента
        .hasAttributes()
            - возввращает true, если у элемента есть атрибуты, и false в противом случаее
        .hasChildNodes()
            - возвращает true, если у элементота есть дочерние элементы, и false в противном случае
        .insertBefore(newNode, nodeNext)
            - вставляеет узел newNode перед доченим узлом nodeNext
        .removeChild(child)
            - удалить узел из доочерних
        .replaceChild(newChild, oldChild)
            - заменяет дочерний узел, на выбраный 
*/

/* Element
    Element.

    .classList
    .childElementCount - Количество дочерних элементов
    .children - возвращает HTMLCollection всех дочерних элементов
    .attributes - возвращает набор атрибутов данного эллементаа
    .className - возвращает класс элеменнта
    .firstElementChild
    .lastElementChild
    .id
    .innerHTML
    .nextElementSibling
    .previousElementSibling
    .tagName
    .style

    .getAttribute(attributeName)
    .getElementsByClassName(classname)
    .getElementsByTagName(tagname)
    .hasAttribute(attr) 
    .requestFullscreen() - развернуть элемент на весь экран

    .dataset - хеш атрибутов-значений, которые вставляются в тег как атрибуты с префиксом data-
*/

/* document
    .exitFullscreen()  - выход из полноэкранного режима
    .fullscreenElement - какой элемент находится в полноэкранном режиме
    .writeln(...)
    .cookie
    .createElement('elementName')   
    .styleSheets - Лист всех загруженных файлов CSS-стилей
    
    .all     - получить коллекцию всех элементов
    .forms   - получить коллекцию всех форм
    .images  - получить коллекцию всех картинок
    .links   - получить коллекцию всех ссылок
    .anchors - получить коллекцию всех якорей страницы
    .fonts   - получить коллекцию загруженных шрифтов
    .hasFocus() - узнать, находится ли фокус на странице
*/

// получение объекта ключ=значение из cookie
// a = Object.fromEntries(document.cookie.split(';').map(attr=> attr.trim().split('=')));

/* table

    .rows
    .tBodies

    .caption
    .tFoot
    .tHead

    .createCaption()
    .createTFoot()
    .createTHead()
    .deleteCaption()
    .deleteRow(index)
    .deleteTFoot()
    .deleteTHead()
    .insertRow()
    .insertRow(index) - если index < 0, то отсчет идет с конца а не начала

    TR
        .insertCell()
        .insertCell(index)
        .deleteCell(index)
*/