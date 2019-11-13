import React, { useState } from 'react';
import {
	TouchableOpacity,
	View,
	Image,
	Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/styles/partials/option';

const Credits = (props) => {
	
	const iconUp = 'chevron-up';
	const iconDown = 'chevron-down';
	const [isArrowPressed,setArrowPressed] = useState(false);
	const [iconName,setIconName] = useState(iconDown);

	toggleDescription = () => {
		setArrowPressed(!isArrowPressed);
		if(iconName == iconUp){
			setIconName(iconDown);
		}
		else{
			setIconName(iconUp);
		}	
	}

	return (
		<View>
			<View style={styles.row}>
				<Text style={styles.textOptions}>{props.information.name}</Text>
					<TouchableOpacity style={styles.iconStyle} onPress={toggleDescription} >
					<Icon
						name={iconName}
						size={20}
						color="#00A2B5"
						style={styles.arrow} />
		        </TouchableOpacity>
			</View>
			<View style={{flexDirection:'column'}}>
				<Image style={styles.line} />
				<View style={{marginTop:5}}>
				{isArrowPressed &&
						props.information.credits.map((credit, index) => (
							<View key={index}>
								<Text style={styles.descriptionTitle}>{credit.title}</Text>
								<Text style={styles.description}>{credit.body}</Text> 
							</View>
						))
					}
				</View>
			</View>
		</View>
	);
};

export default Credits;
