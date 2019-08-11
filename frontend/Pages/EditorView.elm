module Pages.EditorView exposing(viewEditForm, viewSourceForm, viewAddTagForm)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import Html.Events.Extra exposing (targetValueIntParse)
import List exposing (..)
import Json.Decode as Json

import Devs.Objects as O exposing (..)
import Devs.TypeObject as TO exposing (Msg)
import Pages.Utils as PU exposing (alert, onEnter)
import Pages.EditorTabs.Tab1 as Tab1 exposing (showTab)
import Pages.EditorTabs.Tab2 as Tab2 exposing (showTab,showTagOption)
import Pages.EditorTabs.Tab3 as Tab3 exposing (showTab)
import Pages.EditorTabs.Tab4 as Tab4 exposing (showTab)
import Pages.EditorTabs.Tab5 as Tab5 exposing (showTab)
-- View

--type alias Source = {id: Maybe Int, isbn: Maybe String, name: String, year: Maybe String}

viewAddTagForm: Model -> Html Msg
viewAddTagForm model =
  let
    initialTagList = case model.kl.tagList of
      Just tags -> tags
      Nothing -> []
  in
    Html.div [ class "srcFormBG" ][
      Html.div [ class "srcFormDiv" ] [
        Html.div[ class "srcFormDivRow"][
          Html.div[][
            Html.select [ on "change" (Json.map TO.SetChoosenTag targetValueIntParse) ] (List.append [PU.getSelectOption](List.map (Tab2.showTagOption O.getEmptyTag) (sortBy .name initialTagList)))
          ]
        ], PU.alert TO.CloseLoginAlert model.subAlertMessage model,
        Html.div [ class "editFormActionDiv" ][
          Html.button [ onClick TO.AddTagToRecipe ][ Html.text "zuordnen" ],
          Html.button [ onClick TO.CancelAddTag ][ Html.text "abbrechen" ]
        ]
      ]
    ]


viewSourceForm: Model -> Html Msg
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
    Html.div [ class "srcFormBG" ][
      Html.div [ class "srcFormDiv" ] [
        Html.div[ class "srcFormDivRow"][
          {-
          Html.div[][
            Html.label [ for "id" ][ Html.text "ID" ],
            Html.input [ type_ "text", id "id", value idValue, disabled True ][]
          ],
          -}
          Html.div[][
            Html.label [ for "name" ][ Html.text "Name *" ],
            Html.input [ type_ "text", onInput TO.SetSrcName, id "name", value newSrc.name ][]
          ],
          Html.div[][
            Html.label [ for "isbn" ][ Html.text "ISBN" ],
            Html.input [ type_ "text", onInput TO.SetSrcIsbn, id "isbn", value isbnValue ][]
          ],
          Html.div[][
            Html.label [ for "year" ][ Html.text "Jahr" ],
            Html.input [ type_ "text", onInput TO.SetSrcYear, id "year", value yearValue ][]
          ]
        ], PU.alert TO.CloseLoginAlert model.subAlertMessage model,
        Html.div [ class "editFormActionDiv" ][
          Html.button [ onClick TO.SaveNewSource ][ Html.text "speichern" ],
          Html.button [ onClick TO.CancelSourceEdit ][ Html.text "abbrechen" ]
        ]
      ]
    ]

viewEditForm: Model -> Html Msg
viewEditForm model =
  let
    tab1BtnClass = if model.selectedTab == "Tab1" then "TabActive" else "TabInactive"
    tab2BtnClass = if model.selectedTab == "Tab2" then "TabActive" else "TabInactive"
    tab3BtnClass = if model.selectedTab == "Tab3" then "TabActive" else "TabInactive"
    tab4BtnClass = if model.selectedTab == "Tab4" then "TabActive" else "TabInactive"
    tab5BtnClass = if model.selectedTab == "Tab5" then "TabActive" else "TabInactive"
    recipeForEdit = case model.recipeForEdit of
      Just rec -> rec
      Nothing -> O.getEmptyRecipe
    delBtn = if recipeForEdit.id /= Nothing
      then Html.button [ onClick TO.ConfirmDelete ][ Html.text "löschen" ]
      else Html.text ""
    editForm = case model.showEditForm of
      Just ef -> ef
      Nothing -> O.None
  in
    Html.div [ class "editFormBG" ][
      Html.div [ class "editFormDiv" ] [
        case editForm of
          BasicForm -> Tab1.showTab model
          TagForm -> Tab2.showTab model
          IngredientForm -> Tab3.showTab model
          TodoForm -> Tab4.showTab model
          FootValueForm -> Tab5.showTab model
          None -> Html.text ""
{-
        Html.div[ class "TabDiv" ][
          Html.span [ class tab1BtnClass, onClick (TO.ToggleTab "Tab1") ][ Html.text "Grunddaten" ],
          Html.span [ class tab2BtnClass, onClick (TO.ToggleTab "Tab2") ][ Html.text "Tags *" ],
          Html.span [ class tab3BtnClass, onClick (TO.ToggleTab "Tab3") ][ Html.text "Zutaten *" ],
          Html.span [ class tab4BtnClass, onClick (TO.ToggleTab "Tab4") ][ Html.text "Anweisungen *" ],
          Html.span [ class tab5BtnClass, onClick (TO.ToggleTab "Tab5") ][ Html.text "Nährwerte" ]
        ],
        Html.div[ class "TabContentDiv" ][
          (Tab1.showTab model),
          (Tab2.showTab model),
          (Tab3.showTab model),
          (Tab4.showTab model),
          (Tab5.showTab model)
        ], PU.alert TO.CloseRecipeAlert model.recAlertMessage model
-}
        , Html.div [ class "editFormActionDiv" ][
          Html.button [ onClick (TO.ToggleEditForm O.None) ][ Html.text "schließen" ]
{-
          Html.button [ onClick TO.SaveRecipe ][ Html.text "speichern" ],
          delBtn,
          Html.button [ onClick TO.CancelRecipeEdit ][ Html.text "abbrechen" ]
-}
        ]
      ]
    ]
