module Pages.EditorView exposing(viewEditForm, viewSourceForm, viewAddTagForm)

import Html exposing (..)
import Html.Extra as Html
import Html.Attributes as Attr
import Html.Events as Ev
import Html.Events.Extra as Ev
import List as List
--import Json.Decode as Json

import Devs.Objects as O
import Devs.TypeObject as TO
import Pages.Utils as PU
import Pages.EditorTabs.Tab1 as Tab1
import Pages.EditorTabs.Tab2 as Tab2
import Pages.EditorTabs.Tab3 as Tab3
import Pages.EditorTabs.Tab4 as Tab4
import Pages.EditorTabs.Tab5 as Tab5
-- View

--type alias Source = {id: Maybe Int, isbn: Maybe String, name: String, year: Maybe String}

viewAddTagForm: O.Model -> Html TO.Msg
viewAddTagForm model =
  let
    initialTagList = case model.kl.tagList of
      Just tags -> tags
      Nothing -> []
  in
    Html.div [ Attr.class "srcFormBG" ][
      Html.div [ Attr.class "srcFormDiv" ] [
        Html.div[ Attr.class "srcFormDivRow"][
          Html.div[][
            Html.select [ Ev.onChange TO.SetChoosenTag ] (List.append [PU.getSelectOption](List.map (Tab2.showTagOption O.getEmptyTag) (List.sortBy .name initialTagList)))
          ]
        ], PU.alert TO.CloseLoginAlert model.subAlertMessage model,
        Html.div [ Attr.class "editFormActionDiv" ][
          Html.button [ Ev.onClick TO.AddTagToRecipe ][ Html.text "zuordnen" ],
          Html.button [ Ev.onClick TO.CancelAddTag ][ Html.text "abbrechen" ]
        ]
      ]
    ]


viewSourceForm: O.Model -> Html TO.Msg
viewSourceForm model =
  let
    newSrc = case model.newSource of
      Just src -> src
      Nothing -> O.getEmptySource
    {-}
    idValue = case newSrc.id of
      Just val -> String.fromInt val
      Nothing -> ""
    -}
    isbnValue = case newSrc.isbn of
      Just val -> val
      Nothing -> ""
    yearValue = case newSrc.year of
      Just val -> val
      Nothing -> ""
  in
    Html.div [ Attr.class "srcFormBG" ][
      Html.div [ Attr.class "srcFormDiv" ] [
        Html.div[ Attr.class "srcFormDivRow"][
          {-
          Html.div[][
            Html.label [ for "id" ][ Html.text "ID" ],
            Html.input [ type_ "text", id "id", value idValue, disabled True ][]
          ],
          -}
          Html.div[][
            Html.label [ Attr.for "name" ][ Html.text "Name *" ],
            Html.input [ Attr.type_ "text", Ev.onInput TO.SetSrcName, Attr.id "name", Attr.value newSrc.name ][]
          ],
          Html.div[][
            Html.label [ Attr.for "isbn" ][ Html.text "ISBN" ],
            Html.input [ Attr.type_ "text", Ev.onInput TO.SetSrcIsbn, Attr.id "isbn", Attr.value isbnValue ][]
          ],
          Html.div[][
            Html.label [ Attr.for "year" ][ Html.text "Jahr" ],
            Html.input [ Attr.type_ "text", Ev.onInput TO.SetSrcYear, Attr.id "year", Attr.value yearValue ][]
          ]
        ], PU.alert TO.CloseLoginAlert model.subAlertMessage model,
        Html.div [ Attr.class "editFormActionDiv" ][
          Html.button [ Ev.onClick TO.SaveNewSource ][ Html.text "speichern" ],
          Html.button [ Ev.onClick TO.CancelSourceEdit ][ Html.text "abbrechen" ]
        ]
      ]
    ]

viewEditForm: O.Model -> Html TO.Msg
viewEditForm model =
  let
    editForm = case model.showEditForm of
      Just ef -> ef
      Nothing -> O.None
  in
    Html.div [ Attr.class "editFormBG" ][
      Html.div [ Attr.class "editFormDiv" ] [
        case editForm of
          O.BasicForm -> Tab1.showTab model
          O.TagForm -> Tab2.showTab model
          O.IngredientForm -> Tab3.showTab model
          O.TodoForm -> Tab4.showTab model
          O.FootValueForm -> Tab5.showTab model
          O.None -> Html.text ""
        , Html.div [ Attr.class "editFormActionDiv" ][
            Html.button [ Ev.onClick (TO.ToggleEditForm O.None) ][ Html.text "schließen" ]
            , if editForm == O.BasicForm
              then Html.button [ Ev.onClick TO.SaveRecipe ][ Html.text "speichern" ]
              else Html.nothing
        ]
      ]
    ]
