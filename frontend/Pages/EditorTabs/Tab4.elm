module Pages.EditorTabs.Tab4 exposing(showTab)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as Ev
import List as List
import List.Extra as List

import Devs.Objects as O
import Devs.TypeObject as TO
import Pages.Utils as PU
-- View

showTab: O.Model -> Html TO.Msg
showTab model =
  let
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> O.getEmptyRecipe
  in
        Html.div[ Attr.class "showTabContent" ](
          List.concat [
            [getLabelRow],
            ( List.map (showTodoList model.sp recForEdit.id) (List.sortBy .number recForEdit.todos) ),
            [Html.div[][
              Html.button [ Ev.onClick TO.AddTodoToRecipe ][ Html.text "Anweisung hinzufügen" ]
            ]]
          ]
        )

getLabelRow: Html TO.Msg
getLabelRow =
  Html.div[ Attr.class "labelRow"][
      Html.label[ Attr.for "number", Attr.class "numberLabel" ][ Html.text "Nummer" ],
      Html.label[ Attr.for "text", Attr.class "textLabel" ][ Html.text "Text" ],
      Html.label[ Attr.for "image", Attr.class "imageLabel" ][ Html.text "Bild" ],
      Html.label[ Attr.for "comment", Attr.class "imageLabel" ][ Html.text "Kommentar" ]
  ]

showTodoList: O.ServerParams -> Maybe Int -> O.Todo -> Html TO.Msg
showTodoList sp recipeId todo =
  let
    imgValue = case todo.image of
      Just val -> val
      Nothing -> ""
    commentValue = case todo.image_comment of
      Just val -> val
      Nothing -> ""
  in
    Html.div[ Attr.class "todoRow" ](
      List.concat [
          [
            Html.input[ Attr.id "number", Ev.onInput (TO.SetTodoNr todo.uuid), Attr.type_ "number", Attr.class "numberInput", Attr.value (String.fromInt todo.number) ][],
            Html.textarea[ Attr.id "text", Ev.onInput (TO.SetTodoText todo.uuid), Attr.class "textInput", Attr.cols 50, Attr.rows 4 ][ Html.text todo.text ],
            Html.input [ Attr.id "image", Ev.onInput (TO.SetTodoImg todo.uuid), Attr.type_ "text", Attr.class "imageInput", Attr.value imgValue ][],
            Html.input [ Attr.id "comment", Ev.onInput (TO.SetTodoImgComment todo.uuid), Attr.type_ "text", Attr.class "imageInput", Attr.value commentValue ][]
          ], 
          case todo.id of
            Just _ -> [
                PU.getEditButton sp (Just True) "delete.png" Nothing (TO.DeleteTodo todo) [] (Just 15)
                , PU.getEditButton sp (Just True) "save.png" Nothing (TO.UpdateTodo todo) [] (Just 15)
              ]
            Nothing ->  case recipeId of
                Just recId -> [
                    PU.getEditButton sp (Just True) "delete.png" Nothing (TO.RemoveEmptyTodo todo.uuid) [Attr.style "margin-top" "10px"] Nothing
                    , PU.getEditButton sp (Just True) "save.png" Nothing (TO.AddTodo todo recId) [Attr.style "margin-top" "10px"] Nothing
                  ]
                Nothing -> []
        ]
    )
