import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import Chip from "@material-ui/core/Chip";
import recipeStore from "../../store/RecipeStore";
import {
	Wrapper,
	BigImagePicture,
	BigImage,
	Title,
	Content,
	SubTitle,
	FlexWrapper,
} from './styles';

const Recipe = observer(() => {
	const { id } = useParams();
	const recipeInfo = recipeStore.recipeInfo;

	useEffect(() => {
		const loadingData = () => {
			recipeStore.getRecipeInfo(id);
		};

		loadingData();
	}, [id]);

	return (
		<Wrapper>
			<BigImagePicture>
				<BigImage src={recipeInfo.image} />
			</BigImagePicture>
			<Title>
				Name recipe: <i>{ recipeInfo.title }</i>
			</Title>
			<Content
				dangerouslySetInnerHTML={{
					__html: recipeInfo.summary
				}}
			/>
			<SubTitle>List Ingredients:</SubTitle>
			<FlexWrapper>
				{
					recipeInfo.extendedIngredients.map((item, index) => (
						<Chip
							key={index}
							variant="outlined"
							size="small"
							label={item.name}
						/>
					))
				}
			</FlexWrapper>
			<SubTitle>Diets:</SubTitle>
			<FlexWrapper>
				{
					recipeInfo.diets.map((item, index) => (
						<Chip
							key={index}
							variant="outlined"
							size="small"
							color="primary"
							label={item}
						/>
					))
				}
			</FlexWrapper>
		</Wrapper>
	);
});

export default Recipe;
