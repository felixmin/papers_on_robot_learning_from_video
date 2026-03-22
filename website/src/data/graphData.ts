export interface GraphNode {
  id: string;
  type: 'root' | 'topic' | 'paper';
  label: string;
  year?: number;
  repo_url?: string;
  topic?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

// ---------------------------------------------------------------------------
// Topics
// ---------------------------------------------------------------------------

export const topics: { id: string; label: string; color: string }[] = [
  { id: 't_surveys', label: 'Surveys and Background', color: '#6366f1' },
  { id: 't_human_video', label: 'Human-Video Transfer and Visual Pretraining', color: '#ec4899' },
  { id: 't_world_models', label: 'World Models and Robot Foundation Models', color: '#f59e0b' },
  { id: 't_latent', label: 'Latent Action Models and Latent Interfaces', color: '#10b981' },
  { id: 't_language', label: 'Language and Hierarchical Planning', color: '#3b82f6' },
  { id: 't_tamp', label: 'Task and Motion Planning', color: '#8b5cf6' },
  { id: 't_long_horizon', label: 'Long-Horizon Manipulation and Skill Learning', color: '#ef4444' },
  { id: 't_placement', label: 'Object Placement and Spatial Grounding', color: '#14b8a6' },
  { id: 't_perception', label: 'Perception and Segmentation', color: '#f97316' },
];

// ---------------------------------------------------------------------------
// Nodes
// ---------------------------------------------------------------------------

export const nodes: GraphNode[] = [
  // ---- Root ----
  { id: 'root', type: 'root', label: 'Robot Learning from Video' },

  // ---- Topic nodes ----
  { id: 't_surveys', type: 'topic', label: 'Surveys and Background' },
  { id: 't_human_video', type: 'topic', label: 'Human-Video Transfer and Visual Pretraining' },
  { id: 't_world_models', type: 'topic', label: 'World Models and Robot Foundation Models' },
  { id: 't_latent', type: 'topic', label: 'Latent Action Models and Latent Interfaces' },
  { id: 't_language', type: 'topic', label: 'Language and Hierarchical Planning' },
  { id: 't_tamp', type: 'topic', label: 'Task and Motion Planning' },
  { id: 't_long_horizon', type: 'topic', label: 'Long-Horizon Manipulation and Skill Learning' },
  { id: 't_placement', type: 'topic', label: 'Object Placement and Spatial Grounding' },
  { id: 't_perception', type: 'topic', label: 'Perception and Segmentation' },

  // ===========================================================================
  // Surveys and Background
  // ===========================================================================
  {
    id: 'p_generalist_survey',
    type: 'paper',
    label: 'Towards Generalist Robot Learning From Internet Video A Survey',
    year: 2025,
    topic: 't_surveys',
  },
  {
    id: 'p_optim_tamp_survey',
    type: 'paper',
    label: 'A Survey Of Optimization Based Task And Motion Planning From Classical To Learning Approaches',
    year: 2024,
    topic: 't_surveys',
  },
  {
    id: 'p_pretrain_transfer',
    type: 'paper',
    label: 'The Role Of Pre Training Data In Transfer Learning',
    year: 2023,
    topic: 't_surveys',
    repo_url: 'https://github.com/rahimentezari/DataDistributionTransferLearning',
  },

  // ===========================================================================
  // Human-Video Transfer and Visual Pretraining
  // ===========================================================================
  {
    id: 'p_phantom',
    type: 'paper',
    label: 'Phantom Training Robots Without Robots Using Only Human Videos',
    year: 2025,
    topic: 't_human_video',
    repo_url: 'https://github.com/MarionLepert/phantom',
  },
  {
    id: 'p_human_robot_transfer_vla',
    type: 'paper',
    label: 'Emergence Of Human To Robot Transfer In Vision Language Action Models',
    year: 2025,
    topic: 't_human_video',
  },
  {
    id: 'p_r3m',
    type: 'paper',
    label: 'R3M A Universal Visual Representation For Robot Manipulation',
    year: 2022,
    topic: 't_human_video',
    repo_url: 'https://github.com/facebookresearch/r3m',
  },
  {
    id: 'p_mvp',
    type: 'paper',
    label: 'Masked Visual Pre Training For Motor Control',
    year: 2022,
    topic: 't_human_video',
    repo_url: 'https://github.com/ir413/mvp',
  },

  // ===========================================================================
  // World Models and Robot Foundation Models
  // ===========================================================================
  {
    id: 'p_video_pred_policy',
    type: 'paper',
    label: 'Video Prediction Policy A Generalist Robot Policy With Predictive Visual Representations',
    year: 2025,
    topic: 't_world_models',
    repo_url: 'https://github.com/roboterax/video-prediction-policy',
  },
  {
    id: 'p_pi05',
    type: 'paper',
    label: 'Pi0.5 A VLA With Open World Generalization',
    year: 2025,
    topic: 't_world_models',
    repo_url: 'https://github.com/Physical-Intelligence/openpi',
  },
  {
    id: 'p_mimic_video',
    type: 'paper',
    label: 'Mimic Video Video Action Models For Generalizable Robot Control Beyond VLAs',
    year: 2025,
    topic: 't_world_models',
  },
  {
    id: 'p_groot_n1',
    type: 'paper',
    label: 'GR00T N1 An Open Foundation Model For Generalist Humanoid Robots',
    year: 2025,
    topic: 't_world_models',
    repo_url: 'https://github.com/NVIDIA/Isaac-GR00T',
  },
  {
    id: 'p_cosmos',
    type: 'paper',
    label: 'Cosmos World Foundation Model Platform For Physical AI',
    year: 2025,
    topic: 't_world_models',
    repo_url: 'https://github.com/nvidia-cosmos/cosmos-predict1',
  },
  {
    id: 'p_como',
    type: 'paper',
    label: 'CoMo Learning Continuous Latent Motion From Internet Videos For Scalable Robot Learning',
    year: 2025,
    topic: 't_world_models',
    repo_url: 'https://github.com/OpenGVLab/InternVideo2',
  },
  {
    id: 'p_agibot_world',
    type: 'paper',
    label: 'AgiBot World Colosseo A Large Scale Manipulation Platform',
    year: 2025,
    topic: 't_world_models',
    repo_url: 'https://github.com/OpenDriveLab/AgiBot-World',
  },
  {
    id: 'p_genie',
    type: 'paper',
    label: 'GENIE Generative Interactive Environments',
    year: 2024,
    topic: 't_world_models',
    repo_url: 'https://github.com/myscience/open-genie',
  },
  {
    id: 'p_unsup_video_pred',
    type: 'paper',
    label: 'Unsupervised Learning For Physical Interaction Through Video Prediction',
    year: 2016,
    topic: 't_world_models',
  },

  // ===========================================================================
  // Latent Action Models and Latent Interfaces
  // ===========================================================================
  {
    id: 'p_world2act',
    type: 'paper',
    label: 'World2Act Latent Action Post Training via Skill Compositional World Models',
    year: 2026,
    topic: 't_latent',
  },
  {
    id: 'p_unilact',
    type: 'paper',
    label: 'UniLACT Depth Aware RGB Latent Action Learning for VLA Models',
    year: 2026,
    topic: 't_latent',
  },
  {
    id: 'p_mvp_lam',
    type: 'paper',
    label: 'MVP-LAM Learning Action Centric Latent Action via Cross Viewpoint Reconstruction',
    year: 2026,
    topic: 't_latent',
  },
  {
    id: 'p_latent_action_wild',
    type: 'paper',
    label: 'Learning Latent Action World Models In The Wild',
    year: 2026,
    topic: 't_latent',
  },
  {
    id: 'p_villa_x',
    type: 'paper',
    label: 'villa-X Enhancing Latent Action Modeling in VLA Models',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/microsoft/villa-x',
  },
  {
    id: 'p_what_latent_learn',
    type: 'paper',
    label: 'What Do Latent Action Models Actually Learn',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_univla',
    type: 'paper',
    label: 'UniVLA Learning to Act Anywhere with Task centric Latent Actions',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/OpenDriveLab/UniVLA',
  },
  {
    id: 'p_seeing_space_motion',
    type: 'paper',
    label: 'Seeing Space and Motion Enhancing Latent Actions with Spatial and Dynamic Awareness for VLA',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_obj_centric_latent',
    type: 'paper',
    label: 'Object Centric Latent Action Learning',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/dunnolab/object-centric-lapo',
  },
  {
    id: 'p_motus',
    type: 'paper',
    label: 'MOTUS A Unified Latent Action World Model',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/thu-ml/Motus',
  },
  {
    id: 'p_moto',
    type: 'paper',
    label: 'MOTO Latent Motion Token as the Bridging Language for Robot Manipulation from Videos',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/TencentARC/Moto',
  },
  {
    id: 'p_lola',
    type: 'paper',
    label: 'LoLA Long Horizon Latent Action Learning for General Robot Manipulation',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_latent_unlabeled',
    type: 'paper',
    label: 'Latent Action World Models for Control with Unlabeled Trajectories',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_lapa',
    type: 'paper',
    label: 'Latent Action Pretraining from Videos',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/LatentActionPretraining/LAPA',
  },
  {
    id: 'p_latent_supervision',
    type: 'paper',
    label: 'Latent Action Learning Requires Supervision in the Presence of Distractors',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/dunnolab/laom',
  },
  {
    id: 'p_latent_diffusion_ce',
    type: 'paper',
    label: 'Latent Action Diffusion for Cross Embodiment Manipulation',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/srl-ethz/robot_clip',
  },
  {
    id: 'p_latbot',
    type: 'paper',
    label: 'LatBot Distilling Universal Latent Actions for VLA Models',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_laof',
    type: 'paper',
    label: 'LAOF Robust Latent Action Learning with Optical Flow Constraints',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/XizoB/LAOF',
  },
  {
    id: 'p_llms_to_actions',
    type: 'paper',
    label: 'From LLMs to Actions Latent Codes as Bridges in Hierarchical Robot Control',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_flowvla',
    type: 'paper',
    label: 'FlowVLA Visual Chain of Thought based Motion Reasoning for VLA Models',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_coevolving',
    type: 'paper',
    label: 'Co Evolving Latent Action World Models',
    year: 2025,
    topic: 't_latent',
  },
  {
    id: 'p_clam',
    type: 'paper',
    label: 'CLAM Continuous Latent Action Models for Robot Learning from Unlabeled Demonstrations',
    year: 2025,
    topic: 't_latent',
    repo_url: 'https://github.com/clamrobot/clam',
  },
  {
    id: 'p_lapo',
    type: 'paper',
    label: 'LAPO Learning to Act without Actions',
    year: 2024,
    topic: 't_latent',
    repo_url: 'https://github.com/schmidtdominik/LAPO',
  },
  {
    id: 'p_igor',
    type: 'paper',
    label: 'IGOR Image Goal Representations',
    year: 2024,
    topic: 't_latent',
  },
  {
    id: 'p_flow_retrieval',
    type: 'paper',
    label: 'Flow Retrieval Flow Guided Data Retrieval for Few Shot Imitation Learning',
    year: 2024,
    topic: 't_latent',
    repo_url: 'https://github.com/lihenglin/bridge_training_code',
  },
  {
    id: 'p_vqbet',
    type: 'paper',
    label: 'VQ-BeT Behavior Generation with Latent Actions',
    year: 2024,
    topic: 't_latent',
    repo_url: 'https://github.com/jayLEE0301/vq_bet_official',
  },
  {
    id: 'p_no_to_right',
    type: 'paper',
    label: 'No to the Right Online Language Corrections for Robotic Manipulation via Shared Autonomy',
    year: 2023,
    topic: 't_latent',
  },
  {
    id: 'p_lila',
    type: 'paper',
    label: 'LILA Language Informed Latent Actions',
    year: 2022,
    topic: 't_latent',
    repo_url: 'https://github.com/siddk/lila',
  },
  {
    id: 'p_diffusion_bridges',
    type: 'paper',
    label: 'Diffusion Bridges Vector Quantized Variational Autoencoders',
    year: 2022,
    topic: 't_latent',
    repo_url: 'https://github.com/maxjcohen/diffusion-bridges',
  },
  {
    id: 'p_visually_guided_latent',
    type: 'paper',
    label: 'Learning Visually Guided Latent Actions for Assistive Teleoperation',
    year: 2021,
    topic: 't_latent',
    repo_url: 'https://github.com/Stanford-ILIAD/vla',
  },
  {
    id: 'p_latent_no_demos',
    type: 'paper',
    label: 'Learning Latent Actions without Human Demonstrations',
    year: 2021,
    topic: 't_latent',
  },
  {
    id: 'p_laser',
    type: 'paper',
    label: 'LASER Learning a Latent Action Space for Efficient Reinforcement Learning',
    year: 2021,
    topic: 't_latent',
  },
  {
    id: 'p_ilpo',
    type: 'paper',
    label: 'Imitating Latent Policies from Observation',
    year: 2019,
    topic: 't_latent',
    repo_url: 'https://github.com/ashedwards/ILPO',
  },
  {
    id: 'p_shared_autonomy_latent',
    type: 'paper',
    label: 'Shared Autonomy with Learned Latent Actions',
    year: 2020,
    topic: 't_latent',
  },
  {
    id: 'p_controlling_assistive',
    type: 'paper',
    label: 'Controlling Assistive Robots with Learned Latent Actions',
    year: 2019,
    topic: 't_latent',
  },

  // ===========================================================================
  // Language and Hierarchical Planning
  // ===========================================================================
  {
    id: 'p_two_step_multi_agent',
    type: 'paper',
    label: 'Two Step Multi Agent Task Planning Using Classical Planners And LLMs',
    year: 2025,
    topic: 't_language',
  },
  {
    id: 'p_plan_and_act',
    type: 'paper',
    label: 'Plan And Act Improving Planning Of Agents For Long Horizon Tasks',
    year: 2025,
    topic: 't_language',
  },
  {
    id: 'p_llamar',
    type: 'paper',
    label: 'LLaMAR Long Horizon Planning For Multi Agent Robots In Partially Observable Environments',
    year: 2025,
    topic: 't_language',
    repo_url: 'https://github.com/nsidn98/LLaMAR',
  },
  {
    id: 'p_learning_on_job',
    type: 'paper',
    label: 'Learning On The Job An Experience Driven Self Evolving Agent For Long Horizon Tasks',
    year: 2025,
    topic: 't_language',
    repo_url: 'https://github.com/KnowledgeXLab/MUSE',
  },
  {
    id: 'p_hierarchical_control_sys',
    type: 'paper',
    label: 'Learning Hierarchical Control Systems For Autonomous Systems',
    year: 2024,
    topic: 't_language',
  },
  {
    id: 'p_lang_symbolic_planner',
    type: 'paper',
    label: 'Language Augmented Symbolic Planner For Open World Task Planning',
    year: 2024,
    topic: 't_language',
  },
  {
    id: 'p_agent_oriented',
    type: 'paper',
    label: 'Agent Oriented Planning In Multi Agent Systems',
    year: 2024,
    topic: 't_language',
    repo_url: 'https://github.com/lalaliat/Agent-Oriented-Planning',
  },
  {
    id: 'p_hierarchical_decision',
    type: 'paper',
    label: 'A Hierarchical Control Framework For Autonomous Decision Making',
    year: 2024,
    topic: 't_language',
  },
  {
    id: 'p_tidybot',
    type: 'paper',
    label: 'TidyBot Personalized Robot Assistance With Large Language Models',
    year: 2023,
    topic: 't_language',
    repo_url: 'https://github.com/jimmyyhwu/tidybot',
  },
  {
    id: 'p_saycan',
    type: 'paper',
    label: 'SayCan Do As I Can Not As I Say Grounding Language In Robotic Affordances',
    year: 2022,
    topic: 't_language',
    repo_url: 'https://github.com/google-research/google-research/tree/master/saycan',
  },
  {
    id: 'p_high_low_planning',
    type: 'paper',
    label: 'High Level Planning And Low Level Execution Towards A Complete Robotic Agent',
    year: 1997,
    topic: 't_language',
  },

  // ===========================================================================
  // Task and Motion Planning
  // ===========================================================================
  {
    id: 'p_neural_mp',
    type: 'paper',
    label: 'Neural MP A Generalist Neural Motion Planner',
    year: 2024,
    topic: 't_tamp',
    repo_url: 'https://github.com/mihdalal/neuralmotionplanner',
  },
  {
    id: 'p_dimsam',
    type: 'paper',
    label: 'DimSam Diffusion Models As Samplers For TAMP Under Partial Observability',
    year: 2024,
    topic: 't_tamp',
  },
  {
    id: 'p_hierarchical_decoupling',
    type: 'paper',
    label: 'A Hierarchical Decoupling Approach For Fast Temporal Logic Motion Planning',
    year: 2023,
    topic: 't_tamp',
  },
  {
    id: 'p_reactive_mobile',
    type: 'paper',
    label: 'Reactive Planning For Mobile Manipulation Tasks',
    year: 2021,
    topic: 't_tamp',
  },
  {
    id: 'p_integrated_tamp',
    type: 'paper',
    label: 'Integrated Task And Motion Planning',
    year: 2020,
    topic: 't_tamp',
  },
  {
    id: 'p_hierarchical_hybrid_08',
    type: 'paper',
    label: 'Hierarchical Hybrid Symbolic Robot Motion Planning And Control',
    year: 2008,
    topic: 't_tamp',
  },

  // ===========================================================================
  // Long-Horizon Manipulation and Skill Learning
  // ===========================================================================
  {
    id: 'p_manual2skill',
    type: 'paper',
    label: 'Manual2Skill',
    year: 2025,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/owensun2004/Manual2Skill',
  },
  {
    id: 'p_local_policies',
    type: 'paper',
    label: 'Local Policies Enable Zero Shot Long Horizon Manipulation',
    year: 2025,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/mihdalal/manipgen',
  },
  {
    id: 'p_flex_exploration',
    type: 'paper',
    label: 'Learn A Flexible Exploration Model For Parameterized Action MDPs',
    year: 2025,
    topic: 't_long_horizon',
  },
  {
    id: 'p_sim_real_cotrain',
    type: 'paper',
    label: 'Empirical Analysis Of Sim And Real Cotraining Of Diffusion Policies',
    year: 2025,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/sim-and-real-cotraining/diffusion-policy',
  },
  {
    id: 'p_dexgraspvla',
    type: 'paper',
    label: 'DexGraspVLA A VLA Framework Towards General Dexterous Grasping',
    year: 2025,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/Psi-Robot/DexGraspVLA',
  },
  {
    id: 'p_dexflywheel',
    type: 'paper',
    label: 'DexFlywheel A Scalable And Self Improving Data Generation Framework',
    year: 2025,
    topic: 't_long_horizon',
  },
  {
    id: 'p_blox_net',
    type: 'paper',
    label: 'BloX-Net',
    year: 2025,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/Apgoldberg1/blox-net-coderelease',
  },
  {
    id: 'p_arch',
    type: 'paper',
    label: 'ARCH Hierarchical Hybrid Learning For Long Horizon Contact Rich Robotic Assembly',
    year: 2025,
    topic: 't_long_horizon',
  },
  {
    id: 'p_art_imitation',
    type: 'paper',
    label: 'The Art Of Imitation Learning Long Horizon Manipulation Tasks From Few Demonstrations',
    year: 2024,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/robot-learning-freiburg/TAPAS',
  },
  {
    id: 'p_learning_to_build',
    type: 'paper',
    label: 'Learning To Build By Building Your Own Instructions',
    year: 2024,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/aaronwalsman/ltron-torch/tree/eccv-24',
  },
  {
    id: 'p_hierarchical_diffusion',
    type: 'paper',
    label: 'Hierarchical Diffusion Policy Manipulation Trajectory Generation Via Contact Guidance',
    year: 2024,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/dexin-wang/Hierarchical-Diffusion-Policy',
  },
  {
    id: 'p_seq_dexterity',
    type: 'paper',
    label: 'Sequential Dexterity Chaining Dexterous Policies For Long Horizon Manipulation',
    year: 2023,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/sequential-dexterity/SeqDex',
  },
  {
    id: 'p_hierarchical_visual_policy',
    type: 'paper',
    label: 'Hierarchical Visual Policy Learning For Long Horizon Robot Manipulation',
    year: 2023,
    topic: 't_long_horizon',
  },
  {
    id: 'p_gen_skill_chain',
    type: 'paper',
    label: 'Generative Skill Chaining Long Horizon Skill Planning With Diffusion Models',
    year: 2023,
    topic: 't_long_horizon',
  },
  {
    id: 'p_relay_policy',
    type: 'paper',
    label: 'Relay Policy Learning Solving Long Horizon Tasks Via Imitation And RL',
    year: 2019,
    topic: 't_long_horizon',
    repo_url: 'https://github.com/google-research/relay-policy-learning',
  },

  // ===========================================================================
  // Object Placement and Spatial Grounding
  // ===========================================================================
  {
    id: 'p_placeit3d',
    type: 'paper',
    label: 'PlaceIt3D Language Guided Object Placement In Real 3D Scenes',
    year: 2025,
    topic: 't_placement',
    repo_url: 'https://github.com/nianticlabs/placeit3d',
  },
  {
    id: 'p_monoplace3d',
    type: 'paper',
    label: 'MonoPlace3D Learning 3D Aware Object Placement For 3D Monocular Detection',
    year: 2025,
    topic: 't_placement',
    repo_url: 'https://github.com/rishubhpar/mp3D',
  },
  {
    id: 'p_anyplace',
    type: 'paper',
    label: 'AnyPlace Learning Generalized Object Placement',
    year: 2025,
    topic: 't_placement',
    repo_url: 'https://github.com/ac-rad/anyplace',
  },
  {
    id: 'p_seq_obj_placement',
    type: 'paper',
    label: 'Sequential Object Centric Relative Placement Prediction For Long Horizon Imitation Learning',
    year: 2024,
    topic: 't_placement',
  },
  {
    id: 'p_topnet',
    type: 'paper',
    label: 'TopNet Transformer Based Object Placement Network For Image Compositing',
    year: 2023,
    topic: 't_placement',
    repo_url: 'https://github.com/bcmi/TopNet-Object-Placement',
  },
  {
    id: 'p_3d_highlighter',
    type: 'paper',
    label: '3D Highlighter Localizing Regions On 3D Shapes Via Text Descriptions',
    year: 2023,
    topic: 't_placement',
    repo_url: 'https://github.com/threedle/3DHighlighter',
  },

  // ===========================================================================
  // Perception and Segmentation
  // ===========================================================================
  {
    id: 'p_dino_foresight',
    type: 'paper',
    label: 'DINO Foresight Looking Into The Future With DINO',
    year: 2025,
    topic: 't_perception',
    repo_url: 'https://github.com/Sta8is/DINO-Foresight',
  },
  {
    id: 'p_changedino',
    type: 'paper',
    label: 'ChangeDINO DINOv3 Driven Building Change Detection',
    year: 2025,
    topic: 't_perception',
    repo_url: 'https://github.com/chingheng0808/ChangeDINO',
  },
  {
    id: 'p_llm_seg',
    type: 'paper',
    label: 'LLM-Seg Bridging Image Segmentation And Large Language Model Reasoning',
    year: 2024,
    topic: 't_perception',
    repo_url: 'https://github.com/wangjunchi/LLMSeg',
  },
];

// ---------------------------------------------------------------------------
// Edges
// ---------------------------------------------------------------------------

export const edges: GraphEdge[] = [
  // Root -> Topics
  { id: 'e_root_surveys', source: 'root', target: 't_surveys' },
  { id: 'e_root_human_video', source: 'root', target: 't_human_video' },
  { id: 'e_root_world_models', source: 'root', target: 't_world_models' },
  { id: 'e_root_latent', source: 'root', target: 't_latent' },
  { id: 'e_root_language', source: 'root', target: 't_language' },
  { id: 'e_root_tamp', source: 'root', target: 't_tamp' },
  { id: 'e_root_long_horizon', source: 'root', target: 't_long_horizon' },
  { id: 'e_root_placement', source: 'root', target: 't_placement' },
  { id: 'e_root_perception', source: 'root', target: 't_perception' },

  // Surveys and Background -> Papers
  { id: 'e_surveys_generalist_survey', source: 't_surveys', target: 'p_generalist_survey' },
  { id: 'e_surveys_optim_tamp_survey', source: 't_surveys', target: 'p_optim_tamp_survey' },
  { id: 'e_surveys_pretrain_transfer', source: 't_surveys', target: 'p_pretrain_transfer' },

  // Human-Video Transfer -> Papers
  { id: 'e_human_phantom', source: 't_human_video', target: 'p_phantom' },
  { id: 'e_human_transfer_vla', source: 't_human_video', target: 'p_human_robot_transfer_vla' },
  { id: 'e_human_r3m', source: 't_human_video', target: 'p_r3m' },
  { id: 'e_human_mvp', source: 't_human_video', target: 'p_mvp' },

  // World Models -> Papers
  { id: 'e_world_video_pred', source: 't_world_models', target: 'p_video_pred_policy' },
  { id: 'e_world_pi05', source: 't_world_models', target: 'p_pi05' },
  { id: 'e_world_mimic', source: 't_world_models', target: 'p_mimic_video' },
  { id: 'e_world_groot', source: 't_world_models', target: 'p_groot_n1' },
  { id: 'e_world_cosmos', source: 't_world_models', target: 'p_cosmos' },
  { id: 'e_world_como', source: 't_world_models', target: 'p_como' },
  { id: 'e_world_agibot', source: 't_world_models', target: 'p_agibot_world' },
  { id: 'e_world_genie', source: 't_world_models', target: 'p_genie' },
  { id: 'e_world_unsup_vid', source: 't_world_models', target: 'p_unsup_video_pred' },

  // Latent Action Models -> Papers
  { id: 'e_latent_world2act', source: 't_latent', target: 'p_world2act' },
  { id: 'e_latent_unilact', source: 't_latent', target: 'p_unilact' },
  { id: 'e_latent_mvp_lam', source: 't_latent', target: 'p_mvp_lam' },
  { id: 'e_latent_wild', source: 't_latent', target: 'p_latent_action_wild' },
  { id: 'e_latent_villa_x', source: 't_latent', target: 'p_villa_x' },
  { id: 'e_latent_what_learn', source: 't_latent', target: 'p_what_latent_learn' },
  { id: 'e_latent_univla', source: 't_latent', target: 'p_univla' },
  { id: 'e_latent_seeing', source: 't_latent', target: 'p_seeing_space_motion' },
  { id: 'e_latent_obj_centric', source: 't_latent', target: 'p_obj_centric_latent' },
  { id: 'e_latent_motus', source: 't_latent', target: 'p_motus' },
  { id: 'e_latent_moto', source: 't_latent', target: 'p_moto' },
  { id: 'e_latent_lola', source: 't_latent', target: 'p_lola' },
  { id: 'e_latent_unlabeled', source: 't_latent', target: 'p_latent_unlabeled' },
  { id: 'e_latent_lapa', source: 't_latent', target: 'p_lapa' },
  { id: 'e_latent_supervision', source: 't_latent', target: 'p_latent_supervision' },
  { id: 'e_latent_diffusion_ce', source: 't_latent', target: 'p_latent_diffusion_ce' },
  { id: 'e_latent_latbot', source: 't_latent', target: 'p_latbot' },
  { id: 'e_latent_laof', source: 't_latent', target: 'p_laof' },
  { id: 'e_latent_llms_actions', source: 't_latent', target: 'p_llms_to_actions' },
  { id: 'e_latent_flowvla', source: 't_latent', target: 'p_flowvla' },
  { id: 'e_latent_coevolving', source: 't_latent', target: 'p_coevolving' },
  { id: 'e_latent_clam', source: 't_latent', target: 'p_clam' },
  { id: 'e_latent_lapo', source: 't_latent', target: 'p_lapo' },
  { id: 'e_latent_igor', source: 't_latent', target: 'p_igor' },
  { id: 'e_latent_flow_retrieval', source: 't_latent', target: 'p_flow_retrieval' },
  { id: 'e_latent_vqbet', source: 't_latent', target: 'p_vqbet' },
  { id: 'e_latent_no_right', source: 't_latent', target: 'p_no_to_right' },
  { id: 'e_latent_lila', source: 't_latent', target: 'p_lila' },
  { id: 'e_latent_diff_bridges', source: 't_latent', target: 'p_diffusion_bridges' },
  { id: 'e_latent_vis_guided', source: 't_latent', target: 'p_visually_guided_latent' },
  { id: 'e_latent_no_demos', source: 't_latent', target: 'p_latent_no_demos' },
  { id: 'e_latent_laser', source: 't_latent', target: 'p_laser' },
  { id: 'e_latent_ilpo', source: 't_latent', target: 'p_ilpo' },
  { id: 'e_latent_shared_auto', source: 't_latent', target: 'p_shared_autonomy_latent' },
  { id: 'e_latent_controlling', source: 't_latent', target: 'p_controlling_assistive' },

  // Language and Hierarchical Planning -> Papers
  { id: 'e_lang_two_step', source: 't_language', target: 'p_two_step_multi_agent' },
  { id: 'e_lang_plan_act', source: 't_language', target: 'p_plan_and_act' },
  { id: 'e_lang_llamar', source: 't_language', target: 'p_llamar' },
  { id: 'e_lang_on_job', source: 't_language', target: 'p_learning_on_job' },
  { id: 'e_lang_hier_ctrl', source: 't_language', target: 'p_hierarchical_control_sys' },
  { id: 'e_lang_symbolic', source: 't_language', target: 'p_lang_symbolic_planner' },
  { id: 'e_lang_agent_oriented', source: 't_language', target: 'p_agent_oriented' },
  { id: 'e_lang_hier_decision', source: 't_language', target: 'p_hierarchical_decision' },
  { id: 'e_lang_tidybot', source: 't_language', target: 'p_tidybot' },
  { id: 'e_lang_saycan', source: 't_language', target: 'p_saycan' },
  { id: 'e_lang_high_low', source: 't_language', target: 'p_high_low_planning' },

  // Task and Motion Planning -> Papers
  { id: 'e_tamp_neural_mp', source: 't_tamp', target: 'p_neural_mp' },
  { id: 'e_tamp_dimsam', source: 't_tamp', target: 'p_dimsam' },
  { id: 'e_tamp_decoupling', source: 't_tamp', target: 'p_hierarchical_decoupling' },
  { id: 'e_tamp_reactive', source: 't_tamp', target: 'p_reactive_mobile' },
  { id: 'e_tamp_integrated', source: 't_tamp', target: 'p_integrated_tamp' },
  { id: 'e_tamp_hybrid_08', source: 't_tamp', target: 'p_hierarchical_hybrid_08' },

  // Long-Horizon Manipulation -> Papers
  { id: 'e_lh_manual2skill', source: 't_long_horizon', target: 'p_manual2skill' },
  { id: 'e_lh_local_policies', source: 't_long_horizon', target: 'p_local_policies' },
  { id: 'e_lh_flex_explore', source: 't_long_horizon', target: 'p_flex_exploration' },
  { id: 'e_lh_sim_real', source: 't_long_horizon', target: 'p_sim_real_cotrain' },
  { id: 'e_lh_dexgrasp', source: 't_long_horizon', target: 'p_dexgraspvla' },
  { id: 'e_lh_dexflywheel', source: 't_long_horizon', target: 'p_dexflywheel' },
  { id: 'e_lh_blox', source: 't_long_horizon', target: 'p_blox_net' },
  { id: 'e_lh_arch', source: 't_long_horizon', target: 'p_arch' },
  { id: 'e_lh_art_imitation', source: 't_long_horizon', target: 'p_art_imitation' },
  { id: 'e_lh_build', source: 't_long_horizon', target: 'p_learning_to_build' },
  { id: 'e_lh_hier_diffusion', source: 't_long_horizon', target: 'p_hierarchical_diffusion' },
  { id: 'e_lh_seq_dex', source: 't_long_horizon', target: 'p_seq_dexterity' },
  { id: 'e_lh_hier_visual', source: 't_long_horizon', target: 'p_hierarchical_visual_policy' },
  { id: 'e_lh_gen_skill', source: 't_long_horizon', target: 'p_gen_skill_chain' },
  { id: 'e_lh_relay', source: 't_long_horizon', target: 'p_relay_policy' },

  // Object Placement -> Papers
  { id: 'e_place_placeit3d', source: 't_placement', target: 'p_placeit3d' },
  { id: 'e_place_monoplace', source: 't_placement', target: 'p_monoplace3d' },
  { id: 'e_place_anyplace', source: 't_placement', target: 'p_anyplace' },
  { id: 'e_place_seq_obj', source: 't_placement', target: 'p_seq_obj_placement' },
  { id: 'e_place_topnet', source: 't_placement', target: 'p_topnet' },
  { id: 'e_place_3d_high', source: 't_placement', target: 'p_3d_highlighter' },

  // Perception and Segmentation -> Papers
  { id: 'e_perc_dino_fore', source: 't_perception', target: 'p_dino_foresight' },
  { id: 'e_perc_changedino', source: 't_perception', target: 'p_changedino' },
  { id: 'e_perc_llm_seg', source: 't_perception', target: 'p_llm_seg' },
];

// ---------------------------------------------------------------------------
// Influence Edges (paper -> paper ancestry with weight)
// ---------------------------------------------------------------------------

export interface InfluenceEdge {
  id: string;
  source: string;  // ancestor paper
  target: string;  // descendant paper
  weight: number;  // 0.0 - 1.0, how strong the influence
}

export const influenceEdges: InfluenceEdge[] = [
  // === Latent Action Models lineage ===
  // Foundational: assistive robotics with latent actions (2019-2021)
  { id: 'inf_assist_shared', source: 'p_controlling_assistive', target: 'p_shared_autonomy_latent', weight: 0.9 },
  { id: 'inf_assist_visual', source: 'p_controlling_assistive', target: 'p_visually_guided_latent', weight: 0.8 },
  { id: 'inf_assist_nodemos', source: 'p_controlling_assistive', target: 'p_latent_no_demos', weight: 0.7 },
  { id: 'inf_assist_laser', source: 'p_controlling_assistive', target: 'p_laser', weight: 0.6 },
  { id: 'inf_ilpo_laser', source: 'p_ilpo', target: 'p_laser', weight: 0.5 },
  { id: 'inf_shared_lila', source: 'p_shared_autonomy_latent', target: 'p_lila', weight: 0.8 },
  { id: 'inf_visual_lila', source: 'p_visually_guided_latent', target: 'p_lila', weight: 0.6 },
  // Language-informed latent actions
  { id: 'inf_lila_noright', source: 'p_lila', target: 'p_no_to_right', weight: 0.8 },
  // VQ tokenization branch
  { id: 'inf_bridges_vqbet', source: 'p_diffusion_bridges', target: 'p_vqbet', weight: 0.6 },
  { id: 'inf_vqbet_moto', source: 'p_vqbet', target: 'p_moto', weight: 0.7 },
  { id: 'inf_vqbet_lapa', source: 'p_vqbet', target: 'p_lapa', weight: 0.5 },
  // LAPO branch (action-free learning)
  { id: 'inf_lapo_clam', source: 'p_lapo', target: 'p_clam', weight: 0.8 },
  { id: 'inf_lapo_objcentric', source: 'p_lapo', target: 'p_obj_centric_latent', weight: 0.9 },
  { id: 'inf_lapo_supervision', source: 'p_lapo', target: 'p_latent_supervision', weight: 0.8 },
  { id: 'inf_lapo_lapa', source: 'p_lapo', target: 'p_lapa', weight: 0.7 },
  { id: 'inf_ilpo_lapo', source: 'p_ilpo', target: 'p_lapo', weight: 0.6 },
  // IGOR branch
  { id: 'inf_igor_univla', source: 'p_igor', target: 'p_univla', weight: 0.7 },
  // LAPA as central hub (2025)
  { id: 'inf_lapa_villax', source: 'p_lapa', target: 'p_villa_x', weight: 0.8 },
  { id: 'inf_lapa_univla', source: 'p_lapa', target: 'p_univla', weight: 0.7 },
  { id: 'inf_lapa_what', source: 'p_lapa', target: 'p_what_latent_learn', weight: 0.9 },
  { id: 'inf_lapa_wild', source: 'p_lapa', target: 'p_latent_action_wild', weight: 0.7 },
  { id: 'inf_lapa_unilact', source: 'p_lapa', target: 'p_unilact', weight: 0.6 },
  { id: 'inf_lapa_mvplam', source: 'p_lapa', target: 'p_mvp_lam', weight: 0.6 },
  { id: 'inf_lapa_latbot', source: 'p_lapa', target: 'p_latbot', weight: 0.7 },
  // Motion-focused branch
  { id: 'inf_moto_world2act', source: 'p_moto', target: 'p_world2act', weight: 0.7 },
  { id: 'inf_motus_wild', source: 'p_motus', target: 'p_latent_action_wild', weight: 0.6 },
  { id: 'inf_laof_seeing', source: 'p_laof', target: 'p_seeing_space_motion', weight: 0.7 },
  { id: 'inf_flow_flowvla', source: 'p_flow_retrieval', target: 'p_flowvla', weight: 0.7 },
  // World model connections within latent
  { id: 'inf_coevolving_wild', source: 'p_coevolving', target: 'p_latent_action_wild', weight: 0.6 },
  { id: 'inf_unlabeled_motus', source: 'p_latent_unlabeled', target: 'p_motus', weight: 0.6 },
  { id: 'inf_lola_world2act', source: 'p_lola', target: 'p_world2act', weight: 0.5 },

  // === World Models lineage ===
  { id: 'inf_unsup_genie', source: 'p_unsup_video_pred', target: 'p_genie', weight: 0.6 },
  { id: 'inf_genie_cosmos', source: 'p_genie', target: 'p_cosmos', weight: 0.5 },
  { id: 'inf_genie_como', source: 'p_genie', target: 'p_como', weight: 0.6 },
  { id: 'inf_genie_vidpred', source: 'p_genie', target: 'p_video_pred_policy', weight: 0.6 },
  { id: 'inf_genie_mimic', source: 'p_genie', target: 'p_mimic_video', weight: 0.5 },
  { id: 'inf_como_agibot', source: 'p_como', target: 'p_agibot_world', weight: 0.4 },

  // === Language Planning lineage ===
  { id: 'inf_highlvl_saycan', source: 'p_high_low_planning', target: 'p_saycan', weight: 0.5 },
  { id: 'inf_saycan_tidybot', source: 'p_saycan', target: 'p_tidybot', weight: 0.8 },
  { id: 'inf_saycan_symbolic', source: 'p_saycan', target: 'p_lang_symbolic_planner', weight: 0.6 },
  { id: 'inf_tidybot_llamar', source: 'p_tidybot', target: 'p_llamar', weight: 0.5 },
  { id: 'inf_saycan_planact', source: 'p_saycan', target: 'p_plan_and_act', weight: 0.5 },
  { id: 'inf_hierctrl_decision', source: 'p_hierarchical_control_sys', target: 'p_hierarchical_decision', weight: 0.7 },
  { id: 'inf_agent_twostep', source: 'p_agent_oriented', target: 'p_two_step_multi_agent', weight: 0.5 },

  // === Task and Motion Planning lineage ===
  { id: 'inf_hybrid08_integrated', source: 'p_hierarchical_hybrid_08', target: 'p_integrated_tamp', weight: 0.7 },
  { id: 'inf_integrated_reactive', source: 'p_integrated_tamp', target: 'p_reactive_mobile', weight: 0.6 },
  { id: 'inf_reactive_decoupling', source: 'p_reactive_mobile', target: 'p_hierarchical_decoupling', weight: 0.5 },
  { id: 'inf_decoupling_neuralmp', source: 'p_hierarchical_decoupling', target: 'p_neural_mp', weight: 0.5 },
  { id: 'inf_decoupling_dimsam', source: 'p_hierarchical_decoupling', target: 'p_dimsam', weight: 0.6 },

  // === Long-Horizon Manipulation lineage ===
  { id: 'inf_relay_genskill', source: 'p_relay_policy', target: 'p_gen_skill_chain', weight: 0.7 },
  { id: 'inf_relay_seqdex', source: 'p_relay_policy', target: 'p_seq_dexterity', weight: 0.6 },
  { id: 'inf_genskill_hierdiff', source: 'p_gen_skill_chain', target: 'p_hierarchical_diffusion', weight: 0.7 },
  { id: 'inf_seqdex_dexfly', source: 'p_seq_dexterity', target: 'p_dexflywheel', weight: 0.6 },
  { id: 'inf_hiervispol_artimit', source: 'p_hierarchical_visual_policy', target: 'p_art_imitation', weight: 0.6 },
  { id: 'inf_hiervispol_local', source: 'p_hierarchical_visual_policy', target: 'p_local_policies', weight: 0.5 },
  { id: 'inf_genskill_blox', source: 'p_gen_skill_chain', target: 'p_blox_net', weight: 0.5 },
  { id: 'inf_hierdiff_arch', source: 'p_hierarchical_diffusion', target: 'p_arch', weight: 0.6 },

  // === Object Placement lineage ===
  { id: 'inf_topnet_seqobj', source: 'p_topnet', target: 'p_seq_obj_placement', weight: 0.6 },
  { id: 'inf_3dhigh_placeit', source: 'p_3d_highlighter', target: 'p_placeit3d', weight: 0.5 },
  { id: 'inf_topnet_anyplace', source: 'p_topnet', target: 'p_anyplace', weight: 0.5 },
  { id: 'inf_seqobj_monoplace', source: 'p_seq_obj_placement', target: 'p_monoplace3d', weight: 0.5 },

  // === Perception lineage ===
  { id: 'inf_llmseg_dino', source: 'p_llm_seg', target: 'p_dino_foresight', weight: 0.4 },
  { id: 'inf_llmseg_changedino', source: 'p_llm_seg', target: 'p_changedino', weight: 0.4 },

  // === Cross-topic influences ===
  // Visual pretraining -> latent action models
  { id: 'inf_r3m_lapa', source: 'p_r3m', target: 'p_lapa', weight: 0.5 },
  { id: 'inf_mvp_lapa', source: 'p_mvp', target: 'p_lapa', weight: 0.4 },
  // World models -> latent actions
  { id: 'inf_genie_lapa', source: 'p_genie', target: 'p_lapa', weight: 0.5 },
  { id: 'inf_unsup_assist', source: 'p_unsup_video_pred', target: 'p_controlling_assistive', weight: 0.4 },
  { id: 'inf_como_moto', source: 'p_como', target: 'p_moto', weight: 0.5 },
  // Language -> latent actions
  { id: 'inf_saycan_llmsactions', source: 'p_saycan', target: 'p_llms_to_actions', weight: 0.5 },
  // Human video -> world models
  { id: 'inf_r3m_phantom', source: 'p_r3m', target: 'p_phantom', weight: 0.5 },
  { id: 'inf_mvp_phantom', source: 'p_mvp', target: 'p_phantom', weight: 0.4 },
  // Long-horizon <-> latent
  { id: 'inf_relay_lola', source: 'p_relay_policy', target: 'p_lola', weight: 0.4 },
  // Surveys
  { id: 'inf_pretrain_generalist', source: 'p_pretrain_transfer', target: 'p_generalist_survey', weight: 0.4 },
  { id: 'inf_tamp_survey_tamp', source: 'p_integrated_tamp', target: 'p_optim_tamp_survey', weight: 0.5 },
];

// ---------------------------------------------------------------------------
// Computed metadata (parentId, depth, color, children) — derived from edges
// ---------------------------------------------------------------------------

const _parentMap = new Map<string, string>();
for (const e of edges) _parentMap.set(e.target, e.source);

function _depth(id: string): number {
  let d = 0, c = id;
  while (_parentMap.has(c)) { c = _parentMap.get(c)!; d++; }
  return d;
}

const _topicColorMap = new Map(topics.map((t) => [t.id, t.color]));

export interface NodeMeta {
  parentId?: string;
  depth: number;
  color: string;
  childIds: string[];
}

export const nodeMeta = new Map<string, NodeMeta>(
  nodes.map((n) => {
    const parentId = _parentMap.get(n.id);
    const depth = _depth(n.id);
    const color =
      n.type === 'root' ? '#64748b'
      : n.type === 'topic' ? (_topicColorMap.get(n.id) || '#6366f1')
      : n.topic ? (_topicColorMap.get(n.topic) || '#94a3b8')
      : '#94a3b8';
    const childIds = edges.filter((e) => e.source === n.id).map((e) => e.target);
    return [n.id, { parentId, depth, color, childIds }];
  })
);
