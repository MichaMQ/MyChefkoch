module Pages.EditorTabs.Tab4 exposing(showTab)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import List exposing (..)
import List.Extra as ListE
import Json.Decode as Json
import Tuple exposing (..)

--import Html.Events.Extra exposing (targetValueIntParse)

import Devs.Objects as Objects exposing (..)
import Pages.Utils as PU exposing (getSelectOption)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    tabClass = if model.selectedTab == "Tab4" then "showTabContent" else "hideTabContent"
    recForEdit = case model.recipeForEdit of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    todoListOfRec = case recForEdit.todos of
      Just td -> td
      Nothing -> []
  in
        Html.div[ class tabClass ] (
          List.concat [
            [getLabelRow],
            ( List.map showTodoList (indexedMap Tuple.pair (sortBy .number todoListOfRec)) ),
            [Html.div[][
              Html.button [ onClick AddTodoToRecipe ][ Html.text "Anweisung hinzufügen" ]
            ]]
          ]
        )

getLabelRow: Html Msg
getLabelRow =
  Html.div[ class "labelRow"][
      Html.label[ for "number", class "numberLabel" ][ Html.text "Nummer" ],
      Html.label[ for "text", class "textLabel" ][ Html.text "Text" ],
      Html.label[ for "image", class "imageLabel" ][ Html.text "Bild" ],
      Html.label[ for "comment", class "imageLabel" ][ Html.text "Kommentar" ]
  ]

showTodoList: (Int, Todo) -> Html Msg
showTodoList todoObj =
  let
    idx = first todoObj
    todo = second todoObj
    imgValue = case todo.image of
      Just val -> val
      Nothing -> ""
    commentValue = case todo.image_comment of
      Just val -> val
      Nothing -> ""
  in
    Html.div[ class "todoRow" ][
      Html.input[ id "number", onInput (SetTodoNr idx), type_ "number", class "numberInput", value (String.fromInt todo.number) ][],
      Html.textarea[ id "text", onInput (SetTodoText idx), class "textInput", cols 50, rows 4 ][ Html.text todo.text ],
      Html.input [ id "image", onInput (SetTodoImg idx), type_ "text", class "imageInput", value imgValue ][],
      Html.input [ id "comment", onInput (SetTodoImgComment idx), type_ "text", class "imageInput", value commentValue ][],
      Html.button [ onClick RemoveTodoFromRecipe ][ Html.text "-" ]
    ]
