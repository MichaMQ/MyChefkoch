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
import Devs.TypeObject as TO exposing (Msg)
import Pages.Utils as PU exposing (getSelectOption)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
  in
        Html.div[ class "showTabContent" ](
          List.concat [
            [getLabelRow],
            ( List.map showTodoList (indexedMap Tuple.pair (sortBy .number recForEdit.todos)) ),
            [Html.div[][
              Html.button [ onClick TO.AddTodoToRecipe ][ Html.text "Anweisung hinzufügen" ]
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
      Html.input[ id "number", onInput (TO.SetTodoNr idx), type_ "number", class "numberInput", value (String.fromInt todo.number) ][],
      Html.textarea[ id "text", onInput (TO.SetTodoText idx), class "textInput", cols 50, rows 4 ][ Html.text todo.text ],
      Html.input [ id "image", onInput (TO.SetTodoImg idx), type_ "text", class "imageInput", value imgValue ][],
      Html.input [ id "comment", onInput (TO.SetTodoImgComment idx), type_ "text", class "imageInput", value commentValue ][],
      Html.button [ onClick TO.RemoveTodoFromRecipe ][ Html.text "-" ]
    ]
