import React, { useState } from 'react';
import {
	TouchableOpacity,
	View,
	Image,
	Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/styles/partials/option';

const Option = (props) => {
	
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
					{isArrowPressed &&
						<Text style={styles.description}>{props.information.description}</Text> }
			</View>
		</View>
	);
};

export default Option;
