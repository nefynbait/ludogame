var chances=0;
var player1a=-1;
var player1b=-1;
var player2a=-2;
var player2b=-2;
var dice;
var prev;
var player;
var checkwin;
var checkcut;
var chancetoplay;
function rolldice()       //to generate the dice number
{
if (chances!=0)               //to ensure one chance per roll of dice
	{
		document.getElementById('diceno').remove();
	}
dice = Math.floor(Math.random()*7);
//dice=parseInt(prompt(''));
checkcut=1;            //condition to return a token to locker otherwise it is going infinite loop
chancetoplay=1;        //to ensure at most one chance per roll
while(dice==0)   //to ensure the dice number is not zero
	{
		dice = Math.floor(Math.random()*7);
	}

var div1 = document.createElement('strong');
if(chances%2==1)
	{
		var text = document.createTextNode('player2 moves' + ' ' + dice);
	}
else
	{
		var text = document.createTextNode('player1 moves' + ' ' + dice);
	}	
div1.setAttribute('id', 'diceno');
div1.appendChild(text);
document.getElementById('dice').appendChild(div1);
chances++;

}
function checktocut(pl)    //to returna token locker if opponent,s id becomes equal
{
	if(pl=='1a' || pl=='1b')
	{
		if (player1a == player2a || player1b == player2a)
		{
			if(player2a!=27)
				{
					console.log('cut');
					checkcut=0;
					move(player2a, '2a', -2);
					player2a=-2;
				}
		}
		if (player1a == player2b || player1b == player2b)
		{
			if(player2b!=27)
				{
					console.log('cut');
					checkcut=0;
					move(player2b, '2b', -2);
					player2b=-2;
				}
		}
	}
	if(pl=='2a' || pl=='2b')		
	{
		if (player2a == player1a || player2b == player1a)
			{
				if(player1a!=13)
					{
						console.log('cut');
						checkcut=0;
						move(player1a, '1a', -1);
						player1a=-1;
					}
			}
		if (player2a == player1b || player2b == player1b)
			{
				if(player1b!=13)
					{
						console.log('cut');
						checkcut=0;
						move(player1b, '1b', -1);
						player1b=-1;
					}
			}
	}
}
function check1(previous, dicenu, playerid) //to check whether the token doesnot go over one rotation of the board
{
	if(playerid == '1a' || playerid == '1b')
	{
		if(prev< 13 && (prev+dice)>13)
		{
			checkwin=0;
		}
		else
		{
			checkwin=1;
		}
	}
	if(playerid == '2a' || playerid == '2b')
	{
		if(prev< 27 && (prev+dice)>27)
		{
			checkwin=0;
		}
		else
		{
			checkwin=1;
		}
	}
} 
function checkwinner(pl1a, pl2a, pl1b, pl2b)  
{
	if(pl1a==13 && pl1b==13)
	{
		alert('player1 is the winner');
	}
	else if(pl2a==27 && pl2b==27)
	{
		alert('player2 is the winner');
	}
}
function remove(prev2) // it will remove the previously placed pieces
{
	console.log(prev2);
	document.getElementById(prev2).remove();
}
function move(prev1, player1, playerid) // it will move the peices to desired places
{
	remove(player1);
	console.log(prev1, player1, playerid);
	var div2 = document.createElement('div');
	var text1 = document.createTextNode(player1);
	if(player1=='1a')
		{
			div2.setAttribute('id', '1a');
		}
	else if(player1=='1b')
		{
			div2.setAttribute('id', '1b');
		}
	else if(player1=='2a')
		{
			div2.setAttribute('id', '2a');
		}
	else if(player1=='2b')
		{
			div2.setAttribute('id', '2b');
		}			
	div2.appendChild(text1);
	document.getElementById(playerid).appendChild(div2);
	if(checkcut==1)
		{
			checktocut(player1);
		}
	checkwinner(player1a, player2a, player1b, player2b);
}


function check(cell) //it will check the conditions of moving
{
	
	if(chances%2==1)
	{
		if(chancetoplay==1)
		{
		if(cell==-1 && (player1a == -1 || player1b == -1) && dice ==6) //when the peices in locker room
		{
			if(player1a==-1)
			{
				prev=player1a;
				player = '1a';
				player1a= 14;
				chancetoplay=0;
				move(prev, player, player1a);
			}
			else if(player1b==-1)
			{
				prev=player1b;
				player = '1b';
				player1b= 14;
				chancetoplay=0;
				move(prev, player, player1b);
			}
		}
		else if(cell==player1a && player1a!=-1 && player1a!=13)
		{
				prev=player1a;
				player = '1a';
				chancetoplay=0;
				check1(prev, dice, player);
				if(checkwin ==1)
				{
					player1a = player1a + dice;
				
					if(player1a>27)
					{
					player1a=player1a-28;
					}
					move(prev, player, player1a);
				}
		}
		else if(cell==player1b && player1b!=-1 && player1b!=13)
		{
				prev=player1b;
				player = '1b';
				chancetoplay=0;
				check1(prev, dice, player);
				if(checkwin==1)
				{
					player1b=player1b+dice;

					if(player1b>27)
						{
							player1b=player1b-28;
						}
				move(prev, player, player1b);
			}
		}
	}
	else
		alert('chanceover');

	}
	else
	{
		if(chancetoplay==1)
		{
				if(cell==-2 && (player2a == -2 || player2b == -2) && dice ==6)
		{
			if(player2a==-2)
			{
				prev=player2a;
				player = '2a';
				player2a=0;
				chancetoplay=0;
				move(prev, player, player2a);
			}
			else if(player2b==-2)
			{
				prev=player2b;
				player = '2b';
				player2b=0;
				chancetoplay=0;
				move(prev, player, player2b);
			}
		}
		else if(cell==player2a && player2a!=-2 && player2a!=27)
		{
			prev=player2a;
			player = '2a';
			chancetoplay=0;
			check1(prev, dice, player);
			if(checkwin ==1)
			{
				player2a=player2a+dice;
				if(player2a>27)
				{
					player2a=player2a-28;
				}
				move(prev, player, player2a);
			}
		}
		else if(cell==player2b && player2b!=-2 && player2b!=27)
		{
			prev=player2b;
			player = '2b';
			chancetoplay=0;
			check1(prev, dice, player);
			if(checkwin ==1)
			{
				player2b=player2b+dice;
				if(player2b>27)
					{
						player2b=player2b-28;
					}
				move(prev,player, player2b);
			}
		}
	}
		else
		alert('chanceover');
	}
}
